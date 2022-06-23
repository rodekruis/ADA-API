import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import argon2 from "argon2";
import EventCodeEntity from "../event/event-code.entity";
import EventEntity, { EventId } from "../event/event.entity";
import EventAccess from "src/event/event-access.enum";
import e from "express";

type JwtToken = {
    eventId: EventId;
};

@Injectable()
export default class AuthService {
    constructor(
        @InjectRepository(EventCodeEntity)
        private eventCodesRepository: Repository<EventCodeEntity>,
        @InjectRepository(EventEntity)
        private eventsRepository: Repository<EventEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async grantEventAccess(eventId: EventId, code: string) {
        const eventCode = await this.eventCodesRepository.findOne({
            where: { event: eventId },
        });
        if (!eventCode) throw new UnauthorizedException();
        try {
            const verify = await argon2.verify(eventCode.code, code);
            if (!verify) throw new UnauthorizedException();
        } catch (error) {
            throw new UnauthorizedException();
        }
        return this.jwtService.sign({ eventId } as JwtToken);
    }

    async verifyEventAccess(eventId: EventId, token?: string) {
        return (
            (await this.isPublicEvent(eventId)) ||
            (!!token && (await this.hasPrivateEventToken(eventId, token)))
        );
    }

    async isPublicEvent(eventId: EventId) {
        console.log("isPublicEvent");
        const eventEntity = await this.eventsRepository.findOne(eventId);
        if (!eventEntity) throw new UnauthorizedException();
        return EventAccess.Public === eventEntity.access;
    }

    async hasPrivateEventToken(eventId: EventId, token: string) {
        console.log("hasPrivateEventToken");
        try {
            const decodedToken = this.jwtService.verify(token) as JwtToken;
            const eventAccess = eventId === decodedToken.eventId;
            if (eventAccess) {
                const eventCodeEntity = await this.eventCodesRepository.findOne(
                    {
                        where: { event: eventId },
                    },
                );
                if (!eventCodeEntity) throw new UnauthorizedException();
                eventCodeEntity.accessedAt = new Date();
                await eventCodeEntity.save();
            }
            return eventAccess;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}

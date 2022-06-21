import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import argon2 from "argon2";
import EventCodeEntity from "../event/event-code.entity";
import { EventId } from "../event/event.entity";

type JwtToken = {
    eventId: EventId;
};

@Injectable()
export default class AuthService {
    constructor(
        @InjectRepository(EventCodeEntity)
        private eventCodesRepository: Repository<EventCodeEntity>,
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

    async verifyEventAccess(eventId: EventId, token: string) {
        try {
            const decodedToken = this.jwtService.verify(token) as JwtToken;
            const eventAccess = eventId === decodedToken.eventId;
            if (eventAccess) {
                const eventCode = await this.eventCodesRepository.findOne({
                    where: { event: eventId },
                });
                if (!eventCode) throw new UnauthorizedException();
                eventCode.accessedAt = new Date();
                await eventCode.save();
            }
            return eventAccess;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}

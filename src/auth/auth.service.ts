import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import argon2 from "argon2";
import EventCodeEntity from "src/event/event-code.entity";
import { EventId } from "src/event/event.entity";
import { Repository } from "typeorm";

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

    async verifyEventAccess(eventId: EventId, authHeader: string) {
        if (!(authHeader && authHeader.startsWith("Bearer ")))
            throw new UnauthorizedException();
        const token = authHeader.substring(7, authHeader.length);
        if (!token) throw new UnauthorizedException();
        try {
            const decodedToken = this.jwtService.verify(token) as JwtToken;
            return eventId === decodedToken.eventId;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}

import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import argon2 from 'argon2';
import { I18nRequestScopeService } from 'nestjs-i18n';
import EventCodeEntity from '../event/event-code.entity';
import EventAccess from '../event/event-access.enum';
import EventEntity, { EventId } from '../event/event.entity';

type JwtToken = {
    eventId: EventId;
};

@Injectable()
export default class AuthService {
    private eventCodeNotRequired = 'Event Code not required';

    constructor(
        @InjectRepository(EventCodeEntity)
        private eventCodesRepository: Repository<EventCodeEntity>,
        @InjectRepository(EventEntity)
        private eventsRepository: Repository<EventEntity>,
        private readonly jwtService: JwtService,
        private readonly i18n: I18nRequestScopeService,
    ) {
        this.prepareTranslations();
    }

    private prepareTranslations = async () => {
        this.eventCodeNotRequired = await this.i18n.translate(
            'error.NOT_REQUIRED',
            {
                args: {
                    entity: await this.i18n.translate('common.EVENT_CODE'),
                },
            },
        );
    };

    async grantEventAccess(eventId: EventId, code: string) {
        if (await this.isPublicEvent(eventId))
            throw new BadRequestException([this.eventCodeNotRequired]);
        const eventCode = await this.eventCodesRepository.findOne({
            where: { event: { id: Equal(eventId) } },
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
        const isPublicEvent = await this.isPublicEvent(eventId);
        if (!isPublicEvent && !token) throw new UnauthorizedException();
        return (
            isPublicEvent ||
            (!!token &&
                (await this.isRestrictedEventTokenValid(eventId, token)))
        );
    }

    async isPublicEvent(eventId: EventId) {
        const eventEntity = await this.eventsRepository.findOne({
            where: { id: Equal(eventId) },
        });
        if (!eventEntity) throw new UnauthorizedException();
        return EventAccess.public === eventEntity.access;
    }

    async isRestrictedEventTokenValid(eventId: EventId, token: string) {
        try {
            const decodedToken = this.jwtService.verify(token) as JwtToken;
            const eventAccess = eventId === decodedToken.eventId;
            if (eventAccess) {
                const eventEntity = await this.eventsRepository.findOne({
                    where: { id: Equal(eventId) },
                });
                if (!eventEntity) throw new UnauthorizedException();
                await this.eventCodesRepository.update(
                    { event: Equal(eventId) },
                    { accessedAt: new Date() },
                );
            }
            return eventAccess;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}

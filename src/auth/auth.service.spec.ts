import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';

import EventEntity from '../event/event.entity';
import EventCodeEntity from '../event/event-code.entity';
import AuthService from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(EventCodeEntity),
                    useValue: { findOne: jest.fn() },
                },
                {
                    provide: getRepositoryToken(EventEntity),
                    useValue: { findOne: jest.fn() },
                },
                {
                    provide: JwtService,
                    useValue: { sign: jest.fn(), verify: jest.fn() },
                },
                {
                    provide: I18nService,
                    useValue: {
                        translate: jest.fn((key) => Promise.resolve(key)),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

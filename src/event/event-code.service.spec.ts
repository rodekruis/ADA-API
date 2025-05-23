import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';

import EventCodeEntity from './event-code.entity';
import EventCodeService from './event-code.service';

describe('EventCodeService', () => {
    let service: EventCodeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventCodeService,
                {
                    provide: getRepositoryToken(EventCodeEntity),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
                {
                    provide: I18nRequestScopeService,
                    useValue: {
                        translate: jest.fn((key) => Promise.resolve(key)),
                    },
                },
            ],
        }).compile();

        service = module.get<EventCodeService>(EventCodeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

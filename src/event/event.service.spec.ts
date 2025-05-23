import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';

import EventEntity from './event.entity';
import EventService from './event.service';

describe('EventService', () => {
    let service: EventService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventService,
                {
                    provide: getRepositoryToken(EventEntity),
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

        service = module.get<EventService>(EventService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';

import EventLayerEntity from './event-layer.entity';
import EventLayerService from './event-layer.service';

describe('EventLayerService', () => {
    let service: EventLayerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventLayerService,
                {
                    provide: getRepositoryToken(EventLayerEntity),
                    useValue: { findOne: jest.fn() },
                },
                {
                    provide: I18nRequestScopeService,
                    useValue: {
                        translate: jest.fn((key) => Promise.resolve(key)),
                    },
                },
            ],
        }).compile();

        service = module.get<EventLayerService>(EventLayerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

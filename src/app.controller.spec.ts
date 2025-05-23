import { Test, TestingModule } from '@nestjs/testing';

import AppController from './app.controller';
import AppService from './app.service';
import AppServiceMock from './app.service.mock';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                AppService,
                { provide: AppService, useFactory: AppServiceMock },
            ],
        }).compile();

        appController = app.get<AppController>(AppController);
        appService = app.get<AppService>(AppService);
    });

    describe('getHello', () => {
        it('should return "Hello World"', () => {
            const appServiceGetHello = jest.spyOn(appService, 'getHello');
            const appControllerGetHello = appController.getHello();
            expect(appControllerGetHello).resolves.toBe('Hello World');
            expect(appServiceGetHello).toHaveBeenCalledTimes(1);
        });
    });
});

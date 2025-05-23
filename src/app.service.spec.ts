import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';

import AppService from './app.service';

describe('AppService', () => {
    let appService: AppService;
    let i18n: I18nService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                AppService,
                { provide: I18nService, useValue: { translate: jest.fn() } },
            ],
        }).compile();

        appService = app.get<AppService>(AppService);
        i18n = app.get<I18nService>(I18nService);
    });

    describe('getHello', () => {
        it("should call i18n translate with 'common.HELLO_WORLD'", () => {
            const translateSpy = jest.spyOn(i18n, 'translate');
            appService.getHello();
            expect(translateSpy).toHaveBeenCalledWith('common.HELLO_WORLD');
        });
    });
});

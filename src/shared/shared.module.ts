import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';
import { LoggerModule } from 'nestjs-pino';

import i18nConfig from '../config/i18n.config';
import loggerConfig from '../config/logger.config';
import { ormConfig } from '../config/orm.config';
import HttpExceptionFilter from './http-exception.filter';
import HttpResponseInterceptor from './http-response.interceptor';

@Module({
    imports: [
        I18nModule.forRoot(i18nConfig),
        LoggerModule.forRoot(loggerConfig),
        TypeOrmModule.forRoot(ormConfig),
    ],
    controllers: [],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor },
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
    ],
})
export default class SharedModule {}

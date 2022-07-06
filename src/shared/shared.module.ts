import { Module } from "@nestjs/common";
import { I18nModule } from "nestjs-i18n";
import { LoggerModule } from "nestjs-pino";
import { APP_INTERCEPTOR, APP_FILTER } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import loggerConfig from "../config/logger.config";
import i18nConfig from "../config/i18n.config";
import HttpResponseInterceptor from "./http-response.interceptor";
import HttpExceptionFilter from "./http-exception.filter";

@Module({
    imports: [
        I18nModule.forRoot(i18nConfig),
        LoggerModule.forRoot(loggerConfig),
        TypeOrmModule.forRoot(),
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpResponseInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export default class SharedModule {}

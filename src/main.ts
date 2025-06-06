import {
    ClassSerializerInterceptor,
    ValidationPipe,
    ValidationPipeOptions,
    VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
    DocumentBuilder,
    SwaggerCustomOptions,
    SwaggerDocumentOptions,
    SwaggerModule,
} from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { Logger } from 'nestjs-pino';

import AppModule from './app.module';
import serverConfig from './config/server.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.setGlobalPrefix(serverConfig.globalPrefix);
    app.useLogger(app.get(Logger));
    app.use(json(serverConfig.json));
    app.use(urlencoded(serverConfig.urlencoded));

    const validationPipeOptions: ValidationPipeOptions = {
        forbidUnknownValues: true, // https://github.com/typestack/class-validator#passing-options
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    };
    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );

    app.enableVersioning({
        type: VersioningType.MEDIA_TYPE,
        key: serverConfig.versionKey,
    });

    const config = new DocumentBuilder()
        .setTitle(serverConfig.title)
        .setVersion(serverConfig.version)
        .addBearerAuth()
        .build();
    const documentOptions: SwaggerDocumentOptions = {
        autoTagControllers: false,
    };
    const document = SwaggerModule.createDocument(app, config, documentOptions);
    const options: SwaggerCustomOptions = {
        customCss: serverConfig.swaggerCustomCss,
        customSiteTitle: serverConfig.title,
    };
    SwaggerModule.setup(serverConfig.swaggerPrefix, app, document, options);

    await app.listen(serverConfig.port);
}
bootstrap();

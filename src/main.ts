import { NestFactory, Reflector } from "@nestjs/core";
import {
    ClassSerializerInterceptor,
    ValidationPipe,
    ValidationPipeOptions,
    VersioningType,
} from "@nestjs/common";
import {
    SwaggerModule,
    DocumentBuilder,
    SwaggerCustomOptions,
} from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import AppModule from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.useLogger(app.get(Logger));

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

    const title = "ADA API";
    const version = "1.0";

    app.enableVersioning({
        type: VersioningType.MEDIA_TYPE,
        key: "version=",
    });

    const config = new DocumentBuilder()
        .setTitle(title)
        .setVersion(version)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    const options: SwaggerCustomOptions = {
        customCss:
            ".swagger-ui .topbar, .swagger-ui section.models { display: none }",
        customSiteTitle: title,
    };
    SwaggerModule.setup("swagger", app, document, options);

    await app.listen(3000);
}
bootstrap();

import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';
import type { Response } from 'express';
import statuses from 'statuses';
import { pick } from './helper';

interface HttpExceptionMessage {
    message: string;
    errors?: { [key: string]: string[] };
}

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
    readonly defaultStatusMessage = 'Unknown Error';

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const statusCode = exception.getStatus();
        const statusMessage = this.getStatusMessage(statusCode);

        const httpExceptionMessage = this.createHttpExceptionMessage(
            exception.getResponse(),
            statusMessage,
        );

        response.status(statusCode).json(httpExceptionMessage);
    }

    createHttpExceptionMessage = (message: any, defaultMessage: string) => {
        const httpExceptionMessage = (
            typeof message === 'string' ? { message } : message
        ) as HttpExceptionMessage;

        httpExceptionMessage.message =
            'message' in httpExceptionMessage
                ? httpExceptionMessage.message
                : defaultMessage;

        return pick(httpExceptionMessage, 'message', 'errors');
    };

    getStatusMessage = (statusCode: number) =>
        statuses.message[statusCode] || this.defaultStatusMessage;
}

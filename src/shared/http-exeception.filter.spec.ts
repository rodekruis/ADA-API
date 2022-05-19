import {
    ArgumentsHost,
    BadRequestException,
    HttpStatus,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import HttpExceptionFilter from "./http-exception.filter";

describe("HttpExceptionFilter", () => {
    let httpExceptionFilter: HttpExceptionFilter;
    const errors = {
        email: ["Email is required"],
    };

    beforeEach(() => {
        httpExceptionFilter = new HttpExceptionFilter();
    });

    it("should be defined", () => {
        expect(httpExceptionFilter).toBeDefined();
    });

    describe("catch", () => {
        let mockJson: jest.Mock;
        let mockStatus: jest.Mock;
        let mockGetResponse: jest.Mock;
        let mockHttpArgumentsHost: jest.Mock;
        let mockArgumentsHost: ArgumentsHost;
        let createHttpExceptionMessageSpy: jest.SpyInstance;

        beforeEach(() => {
            mockJson = jest.fn();

            mockStatus = jest.fn().mockImplementation(() => ({
                json: mockJson,
            }));

            mockGetResponse = jest.fn().mockImplementation(() => ({
                status: mockStatus,
            }));

            mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
                getResponse: mockGetResponse,
                getRequest: jest.fn(),
            }));

            mockArgumentsHost = {
                switchToHttp: mockHttpArgumentsHost,
                getArgByIndex: jest.fn(),
                getArgs: jest.fn(),
                getType: jest.fn(),
                switchToRpc: jest.fn(),
                switchToWs: jest.fn(),
            } as ArgumentsHost;

            createHttpExceptionMessageSpy = jest.spyOn(
                httpExceptionFilter,
                "createHttpExceptionMessage",
            );
        });

        it("should handle http exception with no argument", () => {
            const statusCode = HttpStatus.NOT_FOUND;
            const message = httpExceptionFilter.getStatusMessage(statusCode);
            const exception = { message, statusCode };
            const httpException = { message };

            httpExceptionFilter.catch(
                new NotFoundException(),
                mockArgumentsHost,
            );

            expect(mockHttpArgumentsHost).toBeCalledTimes(1);
            expect(mockHttpArgumentsHost).toBeCalledWith();
            expect(mockGetResponse).toBeCalledTimes(1);
            expect(mockGetResponse).toBeCalledWith();
            expect(createHttpExceptionMessageSpy).toBeCalledTimes(1);
            expect(createHttpExceptionMessageSpy).toHaveBeenCalledWith(
                exception,
                message,
            );
            expect(mockStatus).toBeCalledTimes(1);
            expect(mockStatus).toBeCalledWith(statusCode);
            expect(mockJson).toBeCalledTimes(1);
            expect(mockJson).toBeCalledWith(httpException);
        });

        it("should handle http exception with string argument", () => {
            const statusCode = HttpStatus.BAD_REQUEST;
            const message = "Bad Request Http Exception Message";
            const error = httpExceptionFilter.getStatusMessage(statusCode);
            const exception = { error, message, statusCode };
            const httpException = { message };

            httpExceptionFilter.catch(
                new BadRequestException(message),
                mockArgumentsHost,
            );

            expect(mockHttpArgumentsHost).toBeCalledTimes(1);
            expect(mockHttpArgumentsHost).toBeCalledWith();
            expect(mockGetResponse).toBeCalledTimes(1);
            expect(mockGetResponse).toBeCalledWith();
            expect(createHttpExceptionMessageSpy).toBeCalledTimes(1);
            expect(createHttpExceptionMessageSpy).toHaveBeenCalledWith(
                exception,
                error,
            );
            expect(mockStatus).toBeCalledTimes(1);
            expect(mockStatus).toBeCalledWith(statusCode);
            expect(mockJson).toBeCalledTimes(1);
            expect(mockJson).toBeCalledWith(httpException);
        });

        it("should handle http exception with message key and without errors key in error object as argument", () => {
            const statusCode = HttpStatus.UNAUTHORIZED;
            const message = "Unauthorized Http Exception Message";
            const errorObject = { message };
            const error = httpExceptionFilter.getStatusMessage(statusCode);
            const httpException = { message };

            httpExceptionFilter.catch(
                new UnauthorizedException(errorObject),
                mockArgumentsHost,
            );

            expect(mockHttpArgumentsHost).toBeCalledTimes(1);
            expect(mockHttpArgumentsHost).toBeCalledWith();
            expect(mockGetResponse).toBeCalledTimes(1);
            expect(mockGetResponse).toBeCalledWith();
            expect(createHttpExceptionMessageSpy).toBeCalledTimes(1);
            expect(createHttpExceptionMessageSpy).toHaveBeenCalledWith(
                errorObject,
                error,
            );
            expect(mockStatus).toBeCalledTimes(1);
            expect(mockStatus).toBeCalledWith(statusCode);
            expect(mockJson).toBeCalledTimes(1);
            expect(mockJson).toBeCalledWith(httpException);
        });

        it("should handle http exception with message key and with errors key in error object as argument", () => {
            const statusCode = HttpStatus.UNAUTHORIZED;
            const message = "Unauthorized Http Exception Message";
            const errorObject = { message, errors };
            const error = httpExceptionFilter.getStatusMessage(statusCode);
            const httpException = { message, errors };

            httpExceptionFilter.catch(
                new UnauthorizedException(errorObject),
                mockArgumentsHost,
            );

            expect(mockHttpArgumentsHost).toBeCalledTimes(1);
            expect(mockHttpArgumentsHost).toBeCalledWith();
            expect(mockGetResponse).toBeCalledTimes(1);
            expect(mockGetResponse).toBeCalledWith();
            expect(createHttpExceptionMessageSpy).toBeCalledTimes(1);
            expect(createHttpExceptionMessageSpy).toHaveBeenCalledWith(
                errorObject,
                error,
            );
            expect(mockStatus).toBeCalledTimes(1);
            expect(mockStatus).toBeCalledWith(statusCode);
            expect(mockJson).toBeCalledTimes(1);
            expect(mockJson).toBeCalledWith(httpException);
        });

        it("should handle http exception without message key and with errors key in error object as argument", () => {
            const statusCode = HttpStatus.UNAUTHORIZED;
            const errorObject = { errors };
            const error = httpExceptionFilter.getStatusMessage(statusCode);
            const httpException = { message: error, errors };

            httpExceptionFilter.catch(
                new UnauthorizedException(errorObject),
                mockArgumentsHost,
            );

            expect(mockHttpArgumentsHost).toBeCalledTimes(1);
            expect(mockHttpArgumentsHost).toBeCalledWith();
            expect(mockGetResponse).toBeCalledTimes(1);
            expect(mockGetResponse).toBeCalledWith();
            expect(createHttpExceptionMessageSpy).toBeCalledTimes(1);
            expect(createHttpExceptionMessageSpy).toHaveBeenCalledWith(
                errorObject,
                error,
            );
            expect(mockStatus).toBeCalledTimes(1);
            expect(mockStatus).toBeCalledWith(statusCode);
            expect(mockJson).toBeCalledTimes(1);
            expect(mockJson).toBeCalledWith(httpException);
        });
    });

    describe("createHttpExceptionMessage", () => {
        it("should return http exception for exception with message string and without errors object", () => {
            const statusCode = HttpStatus.BAD_REQUEST;
            const message = "Bad Request Http Exception Message";
            const error = httpExceptionFilter.getStatusMessage(statusCode);
            const exception = { error, message, statusCode };
            const httpException = { message };

            const httpExceptionMessage =
                httpExceptionFilter.createHttpExceptionMessage(
                    exception,
                    error,
                );

            expect(httpExceptionMessage).toStrictEqual(httpException);
        });

        it("should return http exception for exception without message string and without errors object", () => {
            const statusCode = HttpStatus.BAD_REQUEST;
            const error = httpExceptionFilter.getStatusMessage(statusCode);
            const exception = { error, statusCode };
            const httpException = { message: error };

            const httpExceptionMessage =
                httpExceptionFilter.createHttpExceptionMessage(
                    exception,
                    error,
                );

            expect(httpExceptionMessage).toStrictEqual(httpException);
        });

        it("should return http exception for exception with message string and with errors object", () => {
            const statusCode = HttpStatus.BAD_REQUEST;
            const message = "Bad Request Http Exception Message";
            const error = httpExceptionFilter.getStatusMessage(statusCode);
            const exception = { error, message, statusCode, errors };
            const httpException = { message, errors };

            const httpExceptionMessage =
                httpExceptionFilter.createHttpExceptionMessage(
                    exception,
                    error,
                );

            expect(httpExceptionMessage).toStrictEqual(httpException);
        });

        it("should return http exception for exception without message string and with errors object", () => {
            const statusCode = HttpStatus.BAD_REQUEST;
            const error = httpExceptionFilter.getStatusMessage(statusCode);
            const exception = { error, statusCode, errors };
            const httpException = { message: error, errors };

            const httpExceptionMessage =
                httpExceptionFilter.createHttpExceptionMessage(
                    exception,
                    error,
                );

            expect(httpExceptionMessage).toStrictEqual(httpException);
        });

        it("should return http exception for string as exception", () => {
            const statusCode = HttpStatus.BAD_REQUEST;
            const error = httpExceptionFilter.getStatusMessage(statusCode);
            const message = "string";
            const httpException = { message };

            const httpExceptionMessage =
                httpExceptionFilter.createHttpExceptionMessage(message, error);

            expect(httpExceptionMessage).toStrictEqual(httpException);
        });
    });

    describe("createHttpExceptionMessage", () => {
        it("should return http exception message for matching http status code", () => {
            const statusCode = HttpStatus.BAD_REQUEST;
            const error = httpExceptionFilter.getStatusMessage(statusCode);
            const statusMessage = "Bad Request";

            expect(error).toBe(statusMessage);
        });

        it("should return default status message for invalid http status code", () => {
            const statusCode = -1;
            const error = httpExceptionFilter.getStatusMessage(statusCode);
            const statusMessage = httpExceptionFilter.defaultStatusMessage;

            expect(error).toBe(statusMessage);
        });
    });
});

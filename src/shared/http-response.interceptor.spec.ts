import { CallHandler, ExecutionContext } from "@nestjs/common";
import { of } from "rxjs";
import HttpResponseInterceptor from "./http-response.interceptor";

describe("HttpResponseInterceptor", () => {
    let httpResponseInterceptor: HttpResponseInterceptor;

    beforeEach(() => {
        httpResponseInterceptor = new HttpResponseInterceptor();
    });

    it("should be defined", () => {
        expect(httpResponseInterceptor).toBeDefined();
    });

    describe("intercept", () => {
        const mockExecutionContext = {} as ExecutionContext;
        const mapIndex = 0;
        let transformHttpResponseSpy: jest.SpyInstance;

        beforeEach(() => {
            transformHttpResponseSpy = jest.spyOn(
                httpResponseInterceptor,
                "transformHttpResponse",
            );
        });

        it("should handle string http response", () => {
            const httpResponse = "string";
            const mockCallHandler: CallHandler = {
                handle: () => of(httpResponse),
            };

            httpResponseInterceptor
                .intercept(mockExecutionContext, mockCallHandler)
                .subscribe((response) =>
                    expect(response).toStrictEqual({ message: httpResponse }),
                )
                .unsubscribe();

            expect(transformHttpResponseSpy).toBeCalledTimes(1);
            expect(transformHttpResponseSpy).toHaveBeenCalledWith(
                httpResponse,
                mapIndex,
            );
        });

        it("should handle non-string http response", () => {
            const httpResponse = [{ message: "string" }];
            const mockCallHandler: CallHandler = {
                handle: () => of(httpResponse),
            };

            httpResponseInterceptor
                .intercept(mockExecutionContext, mockCallHandler)
                .subscribe((response) =>
                    expect(response).toStrictEqual(httpResponse),
                )
                .unsubscribe();

            expect(transformHttpResponseSpy).toBeCalledTimes(1);
            expect(transformHttpResponseSpy).toHaveBeenCalledWith(
                httpResponse,
                mapIndex,
            );
        });
    });

    describe("transformHttpResponse", () => {
        it("should scaffold string http response", () => {
            const httpResponse = "string";
            const transformedHttpResponse =
                httpResponseInterceptor.transformHttpResponse(httpResponse);

            expect(transformedHttpResponse).toStrictEqual({
                message: httpResponse,
            });
        });

        it("should not scaffold non-string http response", () => {
            const httpResponse = { message: "string" };
            const transformedHttpResponse =
                httpResponseInterceptor.transformHttpResponse(httpResponse);

            expect(transformedHttpResponse).toBe(httpResponse);
        });
    });
});

import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import EventCodeEntity from "../event/event-code.entity";
import AuthService from "./auth.service";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(EventCodeEntity),
                    useValue: { findOne: jest.fn() },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                        verify: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});

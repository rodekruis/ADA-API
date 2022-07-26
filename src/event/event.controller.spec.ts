import { Test, TestingModule } from "@nestjs/testing";
import AuthService from "../auth/auth.service";
import EventCodeService from "./event-code.service";
import EventLayerService from "./event-layer.service";
import EventController from "./event.controller";
import EventService from "./event.service";

describe("EventController", () => {
    let controller: EventController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventController],
            providers: [
                {
                    provide: EventService,
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
                {
                    provide: EventCodeService,
                    useValue: {
                        find: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: EventLayerService,
                    useValue: {
                        findOne: jest.fn(),
                        find: jest.fn(),
                        save: jest.fn(),
                        remove: jest.fn(),
                    },
                },
                {
                    provide: AuthService,
                    useValue: { grantEventAccess: jest.fn() },
                },
            ],
        }).compile();

        controller = module.get<EventController>(EventController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});

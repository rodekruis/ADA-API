import { Test, TestingModule } from "@nestjs/testing";
import EventCodeService from "./event-code.service";

describe("EventCodeService", () => {
    let service: EventCodeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EventCodeService],
        }).compile();

        service = module.get<EventCodeService>(EventCodeService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});

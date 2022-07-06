import { Test, TestingModule } from "@nestjs/testing";
import EventLayerService from "./event-layer.service";

describe("EventLayerService", () => {
    let service: EventLayerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EventLayerService],
        }).compile();

        service = module.get<EventLayerService>(EventLayerService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});

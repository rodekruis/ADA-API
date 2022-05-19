import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import defaultSort, { getSortEntityFieldNames } from "src/shared/sort";
import EventService from "./event.service";
import EventEntity, {
    PartialEventEntity,
    sortEventEntityFieldsNames,
    EventId,
} from "./event.entity";

@ApiTags("event")
@Controller("events")
export default class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    create(@Body() eventEntity: EventEntity) {
        return this.eventService.create(eventEntity);
    }

    @Get()
    @ApiQuery({
        name: "search",
        type: String,
        required: false,
    })
    @ApiQuery({
        name: "sort",
        enum: getSortEntityFieldNames(sortEventEntityFieldsNames),
        required: false,
        example: defaultSort,
    })
    findAll(@Query("search") search: string, @Query("sort") sort: string) {
        return this.eventService.find(search, sort);
    }

    @Get(":id")
    findOne(@Param("id") id: EventId) {
        return this.eventService.findOne(id);
    }

    @Patch(":id")
    update(
        @Param("id") id: EventId,
        @Body() partialEventEntity: PartialEventEntity,
    ) {
        const eventEntity = new EventEntity();
        if (partialEventEntity.name) eventEntity.name = partialEventEntity.name;
        if (partialEventEntity.type) eventEntity.type = partialEventEntity.type;
        if (partialEventEntity.country)
            eventEntity.country = partialEventEntity.country;
        if (partialEventEntity.startDate)
            eventEntity.startDate = partialEventEntity.startDate;
        if (partialEventEntity.endDate)
            eventEntity.endDate = partialEventEntity.endDate;
        if (partialEventEntity.access)
            eventEntity.access = partialEventEntity.access;
        if (partialEventEntity.peopleAffected)
            eventEntity.peopleAffected = partialEventEntity.peopleAffected;
        if (partialEventEntity.buildingsDamaged)
            eventEntity.buildingsDamaged = partialEventEntity.buildingsDamaged;
        if (partialEventEntity.buildingsDamagedPercentage)
            eventEntity.buildingsDamagedPercentage =
                partialEventEntity.buildingsDamagedPercentage;
        if (partialEventEntity.adminLevelLabels)
            eventEntity.adminLevelLabels = partialEventEntity.adminLevelLabels;

        return this.eventService.update(id, eventEntity);
    }

    @Delete(":id")
    remove(@Param("id") id: EventId) {
        return this.eventService.remove(id);
    }
}

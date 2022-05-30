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
    sortEventEntityFieldsNames,
    EventId,
} from "./event.entity";
import CreateEventDto from "./dto/create-entity.dto";
import UpdateEventDto from "./dto/update-entity.dto";
import EventCodeEntity from "./event-code.entity";
import EventCodeService from "./event-code.service";

@ApiTags("event")
@Controller("events")
export default class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly eventCodeService: EventCodeService,
    ) {}

    @Post()
    async create(@Body() createEventDto: CreateEventDto) {
        const eventEntity = new EventEntity();
        eventEntity.name = createEventDto.name;
        eventEntity.type = createEventDto.type;
        eventEntity.country = createEventDto.country;
        eventEntity.startDate = createEventDto.startDate;
        eventEntity.endDate = createEventDto.endDate;
        eventEntity.access = createEventDto.access;
        eventEntity.peopleAffected = createEventDto.peopleAffected;
        eventEntity.buildingsDamaged = createEventDto.buildingsDamaged;
        eventEntity.buildingsDamagedPercentage =
            createEventDto.buildingsDamagedPercentage;
        eventEntity.adminLevelLabels = createEventDto.adminLevelLabels;

        await this.eventService.save(eventEntity);

        if (createEventDto.code) {
            const eventCodeEntity = new EventCodeEntity();
            eventCodeEntity.code = createEventDto.code;
            eventCodeEntity.event = eventEntity;
            await this.eventCodeService.save(eventCodeEntity);
        }

        return eventEntity;
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
    async update(
        @Param("id") id: EventId,
        @Body() updateEventDto: UpdateEventDto,
    ) {
        const eventEntity = await this.eventService.findOne(id);

        if (updateEventDto.code) {
            const eventCodeEntities = await this.eventCodeService.find(id);

            const eventCodeEntity =
                eventCodeEntities.length > 0
                    ? eventCodeEntities[0]
                    : new EventCodeEntity();

            eventCodeEntity.code = updateEventDto.code;
            eventCodeEntity.event = eventEntity;

            this.eventCodeService.save(eventCodeEntity);
        }

        if (updateEventDto.name) eventEntity.name = updateEventDto.name;
        if (updateEventDto.type) eventEntity.type = updateEventDto.type;
        if (updateEventDto.country)
            eventEntity.country = updateEventDto.country;
        if (updateEventDto.startDate)
            eventEntity.startDate = updateEventDto.startDate;
        if (updateEventDto.endDate)
            eventEntity.endDate = updateEventDto.endDate;
        if (updateEventDto.access) eventEntity.access = updateEventDto.access;
        if (updateEventDto.peopleAffected)
            eventEntity.peopleAffected = updateEventDto.peopleAffected;
        if (updateEventDto.buildingsDamaged)
            eventEntity.buildingsDamaged = updateEventDto.buildingsDamaged;
        if (updateEventDto.buildingsDamagedPercentage)
            eventEntity.buildingsDamagedPercentage =
                updateEventDto.buildingsDamagedPercentage;
        if (updateEventDto.adminLevelLabels)
            eventEntity.adminLevelLabels = updateEventDto.adminLevelLabels;

        return this.eventService.update(id, eventEntity);
    }

    @Delete(":id")
    remove(@Param("id") id: EventId) {
        return this.eventService.remove(id);
    }
}

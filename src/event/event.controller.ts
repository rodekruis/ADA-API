import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    ParseEnumPipe,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import defaultSort, { getSortEntityFieldNames } from '../shared/sort';
import EventGuard from '../auth/event.guard';
import AuthService from '../auth/auth.service';
import AdminGuard from '../auth/admin.guard';
import EventService from './event.service';
import EventEntity, {
    sortEventEntityFieldsNames,
    EventId,
} from './event.entity';
import CreateEventDto from './dto/create-event.dto';
import UpdateEventDto from './dto/update-event.dto';
import EventCodeEntity from './event-code.entity';
import EventCodeService from './event-code.service';
import AccessEventDto from './dto/access-event.dto';
import EventLayerName from './event-layer-name.enum';
import CreateEventLayerDto from './dto/create-event-layer.dto';
import EventLayerEntity from './event-layer.entity';
import EventLayerService from './event-layer.service';

@Controller('events')
export default class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly eventCodeService: EventCodeService,
        private readonly eventLayerService: EventLayerService,
        private readonly authService: AuthService,
    ) {}

    @Get()
    @ApiQuery({
        name: 'search',
        type: String,
        required: false,
    })
    @ApiQuery({
        name: 'sort',
        enum: getSortEntityFieldNames(sortEventEntityFieldsNames),
        required: false,
        example: defaultSort,
    })
    @ApiTags('event')
    findAll(@Query('search') search: string, @Query('sort') sort: string) {
        return this.eventService.find(search, sort);
    }

    @Post()
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiTags('event')
    async create(@Body() createEventDto: CreateEventDto) {
        const eventEntity = new EventEntity();
        eventEntity.name = createEventDto.name;
        eventEntity.type = createEventDto.type;
        eventEntity.country = createEventDto.country;
        eventEntity.geometry = createEventDto.geometry;
        eventEntity.startDate = createEventDto.startDate;
        eventEntity.endDate = createEventDto.endDate;
        eventEntity.access = createEventDto.access;
        eventEntity.peopleAffected = createEventDto.peopleAffected;
        eventEntity.peopleAffectedPercentage =
            createEventDto.peopleAffectedPercentage;
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

    @Get(':id')
    @UseGuards(EventGuard)
    @ApiBearerAuth()
    @ApiTags('event')
    findOne(@Param('id', ParseUUIDPipe) id: EventId) {
        return this.eventService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiTags('event')
    async update(
        @Param('id', ParseUUIDPipe) id: EventId,
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
        if (updateEventDto.geometry)
            eventEntity.geometry = updateEventDto.geometry;
        if (updateEventDto.startDate)
            eventEntity.startDate = updateEventDto.startDate;
        if (updateEventDto.endDate)
            eventEntity.endDate = updateEventDto.endDate;
        if (updateEventDto.access) eventEntity.access = updateEventDto.access;
        if (updateEventDto.peopleAffected)
            eventEntity.peopleAffected = updateEventDto.peopleAffected;
        if (updateEventDto.peopleAffectedPercentage)
            eventEntity.peopleAffectedPercentage =
                updateEventDto.peopleAffectedPercentage;
        if (updateEventDto.buildingsDamaged)
            eventEntity.buildingsDamaged = updateEventDto.buildingsDamaged;
        if (updateEventDto.buildingsDamagedPercentage)
            eventEntity.buildingsDamagedPercentage =
                updateEventDto.buildingsDamagedPercentage;
        if (updateEventDto.adminLevelLabels)
            eventEntity.adminLevelLabels = updateEventDto.adminLevelLabels;

        return this.eventService.update(id, eventEntity);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiTags('event')
    remove(@Param('id', ParseUUIDPipe) id: EventId) {
        return this.eventService.remove(id);
    }

    @Post(':id/code')
    @ApiTags('event-code')
    code(
        @Param('id', ParseUUIDPipe) id: EventId,
        @Body() accessEventDto: AccessEventDto,
    ) {
        return this.authService.grantEventAccess(id, accessEventDto.code);
    }

    @Get(':id/layers')
    @UseGuards(EventGuard)
    @ApiBearerAuth()
    @ApiTags('event-layer')
    readLayers(@Param('id', ParseUUIDPipe) id: EventId) {
        return this.eventLayerService.find(id);
    }

    @Get(':id/layers/:name')
    @UseGuards(EventGuard)
    @ApiParam({
        name: 'name',
        enum: EventLayerName,
    })
    @ApiBearerAuth()
    @ApiTags('event-layer')
    readLayer(
        @Param('id', ParseUUIDPipe) id: EventId,
        @Param('name', new ParseEnumPipe(EventLayerName))
        layerName: EventLayerName,
    ) {
        return this.eventLayerService.findOne(id, layerName);
    }

    @Post(':id/layers/:name')
    @UseGuards(AdminGuard)
    @ApiParam({
        name: 'name',
        enum: EventLayerName,
    })
    @ApiBearerAuth()
    @ApiTags('event-layer')
    async createLayer(
        @Param('id', ParseUUIDPipe) id: EventId,
        @Param('name', new ParseEnumPipe(EventLayerName))
        layerName: EventLayerName,
        @Body() createEventLayerDto: CreateEventLayerDto,
    ) {
        const eventEntity = await this.eventService.findOne(id);

        const eventLayerEntities = await this.eventLayerService.find(
            id,
            layerName,
        );

        const eventLayerEntity =
            eventLayerEntities.length > 0
                ? eventLayerEntities[0]
                : new EventLayerEntity();

        eventLayerEntity.name = layerName;
        eventLayerEntity.event = eventEntity;
        eventLayerEntity.geojson = createEventLayerDto.geojson;
        eventLayerEntity.information = createEventLayerDto.information;
        if (Number.isInteger(eventLayerEntity.version))
            eventLayerEntity.version += 1;

        return this.eventLayerService.save(id, layerName, eventLayerEntity);
    }

    @Delete(':id/layers/:name')
    @UseGuards(AdminGuard)
    @ApiParam({
        name: 'name',
        enum: EventLayerName,
    })
    @ApiBearerAuth()
    @ApiTags('event-layer')
    removeLayer(
        @Param('id', ParseUUIDPipe) id: EventId,
        @Param('name', new ParseEnumPipe(EventLayerName))
        layerName: EventLayerName,
    ) {
        return this.eventLayerService.remove(id, layerName);
    }
}

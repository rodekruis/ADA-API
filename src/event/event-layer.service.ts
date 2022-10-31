import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nRequestScopeService } from "nestjs-i18n";
import { Repository, FindOneOptions, FindManyOptions } from "typeorm";
import EventLayerName from "./event-layer-name.enum";
import EventLayerEntity from "./event-layer.entity";
import { EventId } from "./event.entity";
import { baseEntityFieldsNames } from "../shared/base.entity";

@Injectable()
export default class EventLayerService {
    private eventLayerNotFound = "Event Layer not found";

    constructor(
        @InjectRepository(EventLayerEntity)
        private eventLayersRepository: Repository<EventLayerEntity>,
        private readonly i18n: I18nRequestScopeService,
    ) {
        this.prepareTranslations();
    }

    private prepareTranslations = async () => {
        this.eventLayerNotFound = await this.i18n.translate("error.NOT_FOUND", {
            args: { entity: await this.i18n.translate("common.EVENT_LAYER") },
        });
    };

    find = (
        eventId: EventId,
        layerName?: EventLayerName,
    ): Promise<EventLayerEntity[]> => {
        const findManyOptions: FindManyOptions = {
            where: { event: eventId },
        };

        if (layerName) {
            findManyOptions.where.name = layerName;
        } else {
            findManyOptions.select = [
                "name",
                "information",
                ...baseEntityFieldsNames,
            ];
        }

        return this.eventLayersRepository.find(findManyOptions);
    };

    findOne = async (
        eventId: EventId,
        layerName: EventLayerName,
    ): Promise<EventLayerEntity> => {
        const findOneOptions: FindOneOptions = {
            where: {
                event: eventId,
                name: layerName,
            },
        };
        const eventLayerEntity = await this.eventLayersRepository.findOne(
            findOneOptions,
        );

        if (!eventLayerEntity)
            throw new NotFoundException([this.eventLayerNotFound]);

        return eventLayerEntity;
    };

    save = async (
        eventId: EventId,
        layerName: EventLayerName,
        eventLayerEntity: EventLayerEntity,
    ): Promise<EventLayerEntity> => {
        try {
            const eventLayer = await this.findOne(eventId, layerName);
            await this.eventLayersRepository.update(
                eventLayer.id,
                eventLayerEntity,
            );
        } catch (error) {
            await this.eventLayersRepository.save(eventLayerEntity);
        }

        return this.findOne(eventId, layerName);
    };

    remove = async (id: EventId, layerName: EventLayerName) => {
        const eventLayerEntity = await this.findOne(id, layerName);

        return (await this.eventLayersRepository.delete(eventLayerEntity.id))
            .affected;
    };
}

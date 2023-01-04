import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository, FindOneOptions, FindManyOptions, Equal } from 'typeorm';
import EventLayerName from './event-layer-name.enum';
import EventLayerEntity from './event-layer.entity';
import { EventId } from './event.entity';
import { baseEntityFieldsNames } from '../shared/base.entity';

@Injectable()
export default class EventLayerService {
    private eventLayerNotFound = 'Event Layer not found';

    constructor(
        @InjectRepository(EventLayerEntity)
        private eventLayersRepository: Repository<EventLayerEntity>,
        private readonly i18n: I18nRequestScopeService,
    ) {
        this.prepareTranslations();
    }

    private prepareTranslations = async () => {
        this.eventLayerNotFound = await this.i18n.translate('error.NOT_FOUND', {
            args: { entity: await this.i18n.translate('common.EVENT_LAYER') },
        });
    };

    find = (
        eventId: EventId,
        name?: EventLayerName,
    ): Promise<EventLayerEntity[]> => {
        const findManyOptions: FindManyOptions<EventLayerEntity> = {
            where: { event: Equal(eventId) },
        };

        if (name) {
            findManyOptions.where = { ...findManyOptions.where, name };
        } else {
            findManyOptions.select = [
                'name',
                'information',
                ...baseEntityFieldsNames,
            ];
        }

        return this.eventLayersRepository.find(findManyOptions);
    };

    findOne = async (
        eventId: EventId,
        name: EventLayerName,
    ): Promise<EventLayerEntity> => {
        const findOneOptions: FindOneOptions = {
            where: { event: Equal(eventId), name },
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
        name: EventLayerName,
        eventLayerEntity: EventLayerEntity,
    ): Promise<EventLayerEntity> => {
        try {
            const eventLayer = await this.findOne(eventId, name);
            await this.eventLayersRepository.update(
                { id: Equal(eventLayer.id) },
                eventLayerEntity,
            );
        } catch (error) {
            await this.eventLayersRepository.save(eventLayerEntity);
        }

        return this.findOne(eventId, name);
    };

    remove = async (id: EventId, name: EventLayerName) => {
        const eventLayerEntity = await this.findOne(id, name);

        return (await this.eventLayersRepository.delete(eventLayerEntity.id))
            .affected;
    };
}

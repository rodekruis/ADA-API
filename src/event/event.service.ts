import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Equal, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import getWhereClause from '../shared/search';
import { getOrderClause } from '../shared/sort';
import EventEntity, {
    eventEntityFieldsNames,
    EventId,
    searchEventEntityFieldsNames,
    sortEventEntityFieldsNames,
} from './event.entity';

@Injectable()
export default class EventService {
    private eventNotFound = 'Event not found';

    private defaultSearch = '';

    private defaultSort = 'updatedAt';

    constructor(
        @InjectRepository(EventEntity)
        private eventsRepository: Repository<EventEntity>,
        private readonly i18n: I18nService,
    ) {
        this.prepareTranslations();
    }

    private prepareTranslations = async () => {
        this.eventNotFound = await this.i18n.translate('error.NOT_FOUND', {
            args: { entity: await this.i18n.translate('common.EVENT') },
        });
    };

    save = async (eventEntity: EventEntity) =>
        this.eventsRepository.save(eventEntity);

    find = (search: string, sort: string): Promise<EventEntity[]> => {
        const findManyOptions: FindManyOptions = {
            select: eventEntityFieldsNames,
            where: getWhereClause<EventEntity>(
                search,
                searchEventEntityFieldsNames,
            ),
            order: getOrderClause<EventEntity>(
                sort,
                sortEventEntityFieldsNames,
            ),
        };

        return this.eventsRepository.find(findManyOptions);
    };

    findOne = async (
        search: string = this.defaultSearch,
        sort: string = this.defaultSort,
    ): Promise<EventEntity> => {
        const findOneOptions: FindOneOptions = {
            where: getWhereClause<EventEntity>(
                search,
                searchEventEntityFieldsNames,
            ),
            order: getOrderClause<EventEntity>(
                sort,
                sortEventEntityFieldsNames,
            ),
        };

        const event = await this.eventsRepository.findOne(findOneOptions);

        if (!event) throw new NotFoundException([this.eventNotFound]);

        return event;
    };

    update = async (
        id: EventId,
        eventEntity: EventEntity,
    ): Promise<EventEntity> => {
        await this.eventsRepository.update({ id: Equal(id) }, eventEntity);

        return this.findOne(id);
    };

    remove = async (id: EventId) => {
        await this.findOne(id);

        return (await this.eventsRepository.delete(id)).affected;
    };
}

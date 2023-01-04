import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import getWhereClause from '../shared/search';
import { getOrderClause } from '../shared/sort';
import EventCodeEntity, {
    searchEventCodeEntityFieldsNames,
    sortEventCodeEntityFieldsNames,
    EventCodeId,
} from './event-code.entity';

@Injectable()
export default class EventCodeService {
    private eventCodeNotFound = 'Event Code not found';

    private defaultSearch = '';

    private defaultSort = 'accessedAt';

    constructor(
        @InjectRepository(EventCodeEntity)
        private eventCodesRepository: Repository<EventCodeEntity>,
        private readonly i18n: I18nRequestScopeService,
    ) {
        this.prepareTranslations();
    }

    private prepareTranslations = async () => {
        this.eventCodeNotFound = await this.i18n.translate('error.NOT_FOUND', {
            args: { entity: await this.i18n.translate('common.EVENT_CODE') },
        });
    };

    save = async (eventCodeEntity: EventCodeEntity) =>
        this.eventCodesRepository.save(eventCodeEntity);

    find = (
        search: string = this.defaultSearch,
        sort: string = this.defaultSort,
    ): Promise<EventCodeEntity[]> => {
        const findManyOptions: FindManyOptions = {
            where: getWhereClause<EventCodeEntity>(
                search,
                searchEventCodeEntityFieldsNames,
            ),
            order: getOrderClause<EventCodeEntity>(
                sort,
                sortEventCodeEntityFieldsNames,
            ),
        };
        return this.eventCodesRepository.find(findManyOptions);
    };

    findOne = async (
        search: string = this.defaultSearch,
        sort: string = this.defaultSort,
    ): Promise<EventCodeEntity> => {
        const findOneOptions: FindOneOptions = {
            where: getWhereClause<EventCodeEntity>(
                search,
                searchEventCodeEntityFieldsNames,
            ),
            order: getOrderClause<EventCodeEntity>(
                sort,
                sortEventCodeEntityFieldsNames,
            ),
        };
        const eventCodeEntity = await this.eventCodesRepository.findOne(
            findOneOptions,
        );

        if (!eventCodeEntity)
            throw new NotFoundException([this.eventCodeNotFound]);

        return eventCodeEntity;
    };

    update = async (
        id: EventCodeId,
        eventCodeEntity: EventCodeEntity,
    ): Promise<EventCodeEntity> => {
        await this.eventCodesRepository.update(id, eventCodeEntity);

        return this.findOne(id);
    };

    remove = async (id: EventCodeId) => {
        await this.findOne(id);

        return (await this.eventCodesRepository.delete(id)).affected;
    };
}

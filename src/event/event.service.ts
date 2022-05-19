import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nRequestScopeService } from "nestjs-i18n";
import { FindManyOptions, Repository } from "typeorm";
import { getOrderClause } from "src/shared/sort";
import getWhereClause from "src/shared/search";
import EventEntity, {
    searchEventEntityFieldsNames,
    sortEventEntityFieldsNames,
    EventId,
} from "./event.entity";

@Injectable()
export default class EventService {
    private eventNotFound = "Event not found";

    constructor(
        @InjectRepository(EventEntity)
        private eventsRepository: Repository<EventEntity>,
        private readonly i18n: I18nRequestScopeService,
    ) {
        this.prepareTranslations();
    }

    private prepareTranslations = async () => {
        this.eventNotFound = await this.i18n.translate("error.NOT_FOUND", {
            args: { entity: await this.i18n.translate("common.EVENT") },
        });
    };

    create = async (eventEntity: EventEntity) =>
        this.eventsRepository.save(eventEntity);

    find = (search: string, sort: string): Promise<EventEntity[]> => {
        const findManyOptions: FindManyOptions = {
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

    findOne = async (id: EventId): Promise<EventEntity> => {
        const event = await this.eventsRepository.findOne(id);

        if (!event) throw new NotFoundException([this.eventNotFound]);

        return event;
    };

    update = async (
        id: EventId,
        eventEntity: EventEntity,
    ): Promise<EventEntity> => {
        await this.eventsRepository.update(id, eventEntity);

        return this.findOne(id);
    };

    remove = async (id: EventId) => {
        await this.findOne(id);

        return (await this.eventsRepository.delete(id)).affected;
    };
}

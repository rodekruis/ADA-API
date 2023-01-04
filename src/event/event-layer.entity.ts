import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import BaseEntity, { baseEntityFieldsNames } from '../shared/base.entity';
import EventEntity from './event.entity';
import EventLayerName from './event-layer-name.enum';

@Entity()
export default class EventLayerEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: EventLayerId;

    @Column({
        type: 'enum',
        enum: EventLayerName,
        default: EventLayerName.buildings,
    })
    @IsEnum(EventLayerName)
    name!: EventLayerName;

    @ManyToOne(() => EventEntity, { onDelete: 'CASCADE' })
    @JoinColumn()
    event!: EventEntity;

    @Column({ type: 'json' })
    @IsNotEmpty()
    geojson!: GeoJSON.FeatureCollection;

    @Column({ type: 'text' })
    @IsString()
    @IsNotEmpty()
    information!: string;
}

type EventLayerEntityFieldsName = NonNullable<keyof EventLayerEntity>;

export const sortEventLayerEntityFieldsNames: EventLayerEntityFieldsName[] = [
    'name',
    ...baseEntityFieldsNames,
];

export const searchEventLayerEntityFieldsNames: EventLayerEntityFieldsName[] = [
    'id',
    'event',
];

export type EventLayerId = string & { __brand: 'EventLayerId' };

import {
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
import { GeoJSON } from 'geojson';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import BaseEntity, { baseEntityFieldsNames } from '../shared/base.entity';
import EventAccess from './event-access.enum';
import EventType from './event-type.enum';

@Entity()
export default class EventEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: EventId;

    @Column()
    @IsString()
    @IsNotEmpty()
    name!: string;

    @Column({ type: 'enum', enum: EventType, default: EventType.earthquake })
    @IsEnum(EventType)
    type!: EventType;

    @Column()
    @IsString()
    @IsNotEmpty()
    country!: string;

    @Column({ type: 'json' })
    @IsNotEmpty()
    geometry!: GeoJSON.Point;

    @Column()
    @IsDateString()
    startDate!: Date;

    @Column({ nullable: true, default: null })
    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @Column({ type: 'enum', enum: EventAccess, default: EventAccess.public })
    @IsEnum(EventAccess)
    access!: EventAccess;

    @Column()
    @IsInt()
    @Min(0)
    peopleAffected!: number;

    @Column('float')
    @IsNumber()
    @Min(0)
    @Max(1)
    peopleAffectedPercentage!: number;

    @Column()
    @IsInt()
    @Min(0)
    buildingsDamaged!: number;

    @Column('float')
    @IsNumber()
    @Min(0)
    @Max(1)
    buildingsDamagedPercentage!: number;

    @Column()
    @IsString()
    adminLevelLabels!: string;
}

type EventEntityFieldsName = NonNullable<keyof EventEntity>;

export const eventEntityFieldsNames: EventEntityFieldsName[] = [
    'name',
    'type',
    'country',
    'geometry',
    'startDate',
    'endDate',
    'access',
    ...baseEntityFieldsNames,
];

export const sortEventEntityFieldsNames: EventEntityFieldsName[] = [
    'name',
    'type',
    'country',
    'startDate',
    'endDate',
    'access',
    'peopleAffected',
    'peopleAffectedPercentage',
    'buildingsDamaged',
    'buildingsDamagedPercentage',
    ...baseEntityFieldsNames,
];

export const searchEventEntityFieldsNames: EventEntityFieldsName[] = [
    'id',
    'name',
    'type',
    'country',
    'startDate',
    'endDate',
    'access',
    'peopleAffected',
    'peopleAffectedPercentage',
    'buildingsDamaged',
    'buildingsDamagedPercentage',
];

export type EventId = string & { __brand: 'EventId' };

import {
    IsOptional,
    IsString,
    IsNotEmpty,
    IsDateString,
    IsInt,
    Max,
    Min,
    IsEnum,
} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import BaseEntity, { baseEntityFieldsNames } from "src/shared/base.entity";
import EventAccess from "./event-access.enum";
import EventType from "./event-type.enum";

@Entity()
export default class EventEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: EventId;

    @Column()
    @IsString()
    @IsNotEmpty()
    name!: string;

    @Column({ type: "enum", enum: EventType, default: EventType.Hurricane })
    @IsEnum(EventType)
    type!: EventType;

    @Column()
    @IsString()
    @IsNotEmpty()
    country!: string;

    @Column()
    @IsDateString()
    startDate!: Date;

    @Column({ nullable: true, default: null })
    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @Column({ type: "enum", enum: EventAccess, default: EventAccess.Public })
    @IsEnum(EventAccess)
    access!: EventAccess;

    @Column()
    @IsInt()
    @Min(0)
    peopleAffected!: number;

    @Column()
    @IsInt()
    @Min(0)
    buildingsDamaged!: number;

    @Column()
    @IsInt()
    @Min(0)
    @Max(100)
    buildingsDamagedPercentage!: number;

    @Column()
    @IsString()
    adminLevelLabels!: string;
}

type EventEntityFieldsName = NonNullable<keyof EventEntity>;

export const eventEntityFieldsNames: EventEntityFieldsName[] = [
    "name",
    "type",
    "country",
    "startDate",
    "endDate",
    "access",
    ...baseEntityFieldsNames,
];

export const sortEventEntityFieldsNames: EventEntityFieldsName[] = [
    "name",
    "type",
    "country",
    "startDate",
    "endDate",
    "access",
    "peopleAffected",
    "buildingsDamaged",
    "buildingsDamagedPercentage",
    ...baseEntityFieldsNames,
];

export const searchEventEntityFieldsNames: EventEntityFieldsName[] = [
    "id",
    "name",
    "type",
    "country",
    "startDate",
    "endDate",
    "access",
    "peopleAffected",
    "buildingsDamaged",
    "buildingsDamagedPercentage",
];

export type EventId = string & { __brand: "EventId" };

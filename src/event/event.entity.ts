import { ApiProperty, PartialType } from "@nestjs/swagger";
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
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";
import BaseEntity, {
    searchBaseEntityFieldsNames,
    sortBaseEntityFieldsNames,
} from "src/shared/base.entity";

enum EventType {
    Hurricane,
    Eruption,
    Storm,
    Explosion,
    Typhoon,
}

enum EventAccess {
    Private,
    Public,
}

@Entity()
export default class EventEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: EventId;

    @Column()
    @ApiProperty({ example: "Irma" })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @Column({ nullable: true })
    @ApiProperty({ example: EventType.Hurricane })
    @IsEnum(EventType)
    type!: EventType;

    @Column()
    @ApiProperty({ example: "Sint-Maarten" })
    @IsString()
    @IsNotEmpty()
    country!: string;

    @Column()
    @ApiProperty({ example: "2022-12-31" })
    @IsDateString()
    startDate!: Date;

    @Column()
    @ApiProperty({ example: "2023-12-31" })
    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @Column()
    @ApiProperty({ example: EventAccess.Public })
    @IsEnum(EventType)
    access!: EventAccess;

    @Column()
    @ApiProperty({ example: 0 })
    @IsInt()
    @Min(0)
    peopleAffected!: number;

    @Column()
    @ApiProperty({ example: 0 })
    @IsInt()
    @Min(0)
    buildingsDamaged!: number;

    @Column()
    @ApiProperty({ example: 0 })
    @IsInt()
    @Min(0)
    @Max(100)
    buildingsDamagedPercentage!: number;

    @Column()
    @ApiProperty({ example: "Province,District,Municipality" })
    @IsString()
    adminLevelLabels!: string;
}

export class PartialEventEntity extends PartialType(EventEntity) {}

type EventEntityFieldsName = NonNullable<EntityFieldsNames<EventEntity>>;

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
    ...sortBaseEntityFieldsNames,
];

export const searchEventEntityFieldsNames: EventEntityFieldsName[] = [
    "name",
    "type",
    "country",
    "startDate",
    "endDate",
    "access",
    "peopleAffected",
    "buildingsDamaged",
    "buildingsDamagedPercentage",
    ...searchBaseEntityFieldsNames,
];

export type EventId = string & { __brand: "eventId" };

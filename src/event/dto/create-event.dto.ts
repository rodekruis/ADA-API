import { ApiProperty } from "@nestjs/swagger";
import {
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    Min,
} from "class-validator";
import EventAccess from "../event-access.enum";
import EventType from "../event-type.enum";

export default class CreateEventDto {
    @ApiProperty({ example: "Irma" })
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    @ApiProperty({ example: EventType.Hurricane, enum: EventType })
    @IsEnum(EventType)
    readonly type!: EventType;

    @ApiProperty({ example: "Sint-Maarten" })
    @IsString()
    @IsNotEmpty()
    readonly country!: string;

    @ApiProperty({ example: "2022-12-31" })
    @IsDateString()
    readonly startDate!: Date;

    @ApiProperty({ example: "2023-12-31" })
    @IsOptional()
    @IsDateString()
    readonly endDate?: Date;

    @ApiProperty({ example: EventAccess.Public, enum: EventAccess })
    @IsEnum(EventAccess)
    readonly access!: EventAccess;

    @ApiProperty({ example: 0 })
    @IsInt()
    @Min(0)
    readonly peopleAffected!: number;

    @ApiProperty({ example: 0 })
    @IsInt()
    @Min(0)
    readonly buildingsDamaged!: number;

    @ApiProperty({ example: 0 })
    @IsInt()
    @Min(0)
    @Max(100)
    readonly buildingsDamagedPercentage!: number;

    @ApiProperty({ example: "Province,District,Municipality" })
    @IsString()
    readonly adminLevelLabels!: string;

    @ApiProperty({ example: "RVXaCUeUT4gBwzvy" })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly code?: string;
}

import { ApiProperty } from '@nestjs/swagger';
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

import EventAccess from '../event-access.enum';
import EventType from '../event-type.enum';

export default class CreateEventDto {
    @ApiProperty({ example: 'Irma' })
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    @ApiProperty({ example: EventType.tropicalCyclone, enum: EventType })
    @IsEnum(EventType)
    readonly type!: EventType;

    @ApiProperty({ example: 'Sint-Maarten' })
    @IsString()
    @IsNotEmpty()
    readonly country!: string;

    @ApiProperty({
        example: { type: 'Point', coordinates: [18.0291075, -63.0591] },
    })
    @IsNotEmpty()
    readonly geometry!: GeoJSON.Point;

    @ApiProperty({ example: '2022-12-31' })
    @IsDateString()
    readonly startDate!: Date;

    @ApiProperty({ example: '2023-12-31' })
    @IsOptional()
    @IsDateString()
    readonly endDate?: Date;

    @ApiProperty({ example: EventAccess.public, enum: EventAccess })
    @IsEnum(EventAccess)
    readonly access!: EventAccess;

    @ApiProperty({ example: 0 })
    @IsInt()
    @Min(0)
    readonly peopleAffected!: number;

    @ApiProperty({ example: 0 })
    @IsNumber()
    @Min(0)
    @Max(1)
    readonly peopleAffectedPercentage!: number;

    @ApiProperty({ example: 0 })
    @IsInt()
    @Min(0)
    readonly buildingsDamaged!: number;

    @ApiProperty({ example: 0 })
    @IsNumber()
    @Min(0)
    @Max(1)
    readonly buildingsDamagedPercentage!: number;

    @ApiProperty({ example: 'Province,District,Municipality' })
    @IsString()
    readonly adminLevelLabels!: string;

    @ApiProperty({ example: 'RVXaCUeUT4gBwzvy' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly code?: string;
}

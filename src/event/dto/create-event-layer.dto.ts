import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsString } from "class-validator";

export default class CreateEventLayerDto {
    @ApiProperty({
        example:
            '{"type":"Feature","geometry":{"type":"Point","coordinates":[125.6,10.1]},"properties":{"name":"Dinagat Islands"}}',
    })
    @IsJSON()
    @IsNotEmpty()
    readonly geojson!: string;

    @ApiProperty({ example: "Supporting information about this event layer." })
    @IsString()
    @IsNotEmpty()
    readonly information!: string;
}

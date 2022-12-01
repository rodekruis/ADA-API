import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class CreateEventLayerDto {
    @ApiProperty({
        example: {
            type: "Feature",
            geometry: { type: "Point", coordinates: [125.6, 10.1] },
            properties: { name: "Dinagat Islands" },
        },
    })
    @IsNotEmpty()
    readonly geojson!: GeoJSON.FeatureCollection;

    @ApiProperty({ example: "Supporting information about this event layer." })
    @IsString()
    @IsNotEmpty()
    readonly information!: string;
}

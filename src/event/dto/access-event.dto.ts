import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class AccessEventDto {
    @ApiProperty({ example: "RVXaCUeUT4gBwzvy" })
    @IsString()
    @IsNotEmpty()
    readonly code!: string;
}

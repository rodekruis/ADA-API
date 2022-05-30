import { PartialType } from "@nestjs/swagger";
import CreateEventDto from "./create-entity.dto";

export default class UpdateEventDto extends PartialType(CreateEventDto) {}

import { PartialType } from '@nestjs/swagger';
import CreateEventDto from './create-event.dto';

export default class UpdateEventDto extends PartialType(CreateEventDto) {}

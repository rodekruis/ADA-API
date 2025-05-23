import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import AuthModule from '../auth/auth.module';
import EventController from './event.controller';
import EventEntity from './event.entity';
import EventService from './event.service';
import EventCodeEntity from './event-code.entity';
import EventCodeService from './event-code.service';
import EventLayerEntity from './event-layer.entity';
import EventLayerService from './event-layer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([EventEntity]),
        TypeOrmModule.forFeature([EventCodeEntity]),
        TypeOrmModule.forFeature([EventLayerEntity]),
        AuthModule,
    ],
    controllers: [EventController],
    providers: [EventService, EventCodeService, EventLayerService],
})
export default class EventModule {}

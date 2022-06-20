import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import AuthModule from "src/auth/auth.module";
import EventService from "./event.service";
import EventController from "./event.controller";
import EventEntity from "./event.entity";
import EventCodeEntity from "./event-code.entity";
import EventCodeService from "./event-code.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([EventEntity]),
        TypeOrmModule.forFeature([EventCodeEntity]),
        AuthModule,
    ],
    controllers: [EventController],
    providers: [EventService, EventCodeService],
})
export default class EventModule {}

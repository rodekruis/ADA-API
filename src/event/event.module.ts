import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import EventService from "./event.service";
import EventController from "./event.controller";
import EventEntity from "./event.entity";

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity])],
    controllers: [EventController],
    providers: [EventService],
})
export default class EventModule {}

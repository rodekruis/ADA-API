import { Module } from "@nestjs/common";
import EventModule from "./event/event.module";
import AppService from "./app.service";
import AppController from "./app.controller";
import SharedModule from "./shared/shared.module";

@Module({
    imports: [SharedModule, EventModule],
    controllers: [AppController],
    providers: [AppService],
})
export default class AppModule {}

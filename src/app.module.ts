import { Module } from '@nestjs/common';

import AppController from './app.controller';
import AppService from './app.service';
import EventModule from './event/event.module';
import SharedModule from './shared/shared.module';

@Module({
    imports: [SharedModule, EventModule],
    controllers: [AppController],
    providers: [AppService],
})
export default class AppModule {}

import { Controller, Get } from '@nestjs/common';

import AppService from './app.service';

@Controller()
export default class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): Promise<string> {
        return this.appService.getHello();
    }
}

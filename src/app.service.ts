import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export default class AppService {
    constructor(private readonly i18n: I18nService) {}

    getHello(): Promise<string> {
        return this.i18n.translate('common.HELLO_WORLD');
    }
}

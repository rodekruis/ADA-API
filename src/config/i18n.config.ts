import { AcceptLanguageResolver, I18nOptions } from 'nestjs-i18n';
import { join } from 'path';

const path = join(__dirname, '..', 'i18n');

const i18nConfig: I18nOptions = {
    fallbackLanguage: 'en',
    loaderOptions: { path },
    resolvers: [
        { use: AcceptLanguageResolver, options: { matchType: 'strict-loose' } },
    ],
};

export default i18nConfig;

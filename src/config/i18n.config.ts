import { join } from "path";
import {
    I18nJsonParser,
    AcceptLanguageResolver,
    I18nOptions,
} from "nestjs-i18n";

const path = join(__dirname, "..", "i18n");

const i18nConfig: I18nOptions = {
    fallbackLanguage: "en",
    parser: I18nJsonParser,
    parserOptions: { path },
    resolvers: [
        {
            use: AcceptLanguageResolver,
            options: { matchType: "strict-loose" },
        },
    ],
};

export default i18nConfig;

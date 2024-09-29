import * as Localization from 'expo-localization';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './assets/locales/en/translations.json';
import es from './assets/locales/es/translations.json';
import {
    localizationStore,
    localizationStoreActions,
} from './stores/localization.store';

const resources = {
    en: {translation: en},
    es: {translation: es},
};

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        localizationStore.subscribe(({languageCode: storedLanguageCode}) => {
            let languageCode = Localization.getLocales().at(0)?.languageCode;
            callback(storedLanguageCode ?? languageCode);
        });
    },
    cacheUserLanguage: (language) => {
        const {languageCode: storedLanguageCode} = localizationStore.getState();
        if (typeof language !== 'string') {
            return;
        }
        if (language === storedLanguageCode) {
            return;
        }
        localizationStoreActions.setLanguageCode(language);
    },
};

i18n.use(languageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
});

export default i18n;

import * as Localization from 'expo-localization';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './assets/locales/en/translations.json';
import es from './assets/locales/es/translations.json';

const resources = {
    en: {translation: en},
    es: {translation: es},
};

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (callback) => {
        // const storedLanguage = await AsyncStorage.getItem('@AppIntl:language');
        // if (storedLanguage) {
        //     return callback(storedLanguage);
        // }

        let languageCode = Localization.getLocales().at(0)?.languageCode;

        return callback(languageCode);
    },
    init: () => {},
    // cacheUserLanguage: (language) => {
    //     // Essa função sera chamada assim que o callback
    //     // da função 'detect' for executado. Aqui podemos
    //     // salvar o idioma do usuário no AsyncStorage para
    //     // persistirmos sua escolha nas próximas execuções do app
    //     AsyncStorage.setItem('@AppIntl:language', language);
    // },
};

i18n.use(languageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
});

export default i18n;

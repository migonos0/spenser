import {zustandPersistentStorage} from '@/common/infra/zustand-peristent-storage';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type LocalizationState = {
    languageCode?: string;
};
export const localizationStore = create<LocalizationState>()(
    persist(() => ({}), {
        name: 'localizationState',
        storage: zustandPersistentStorage,
    }),
);

export const useLanguageCode = () =>
    localizationStore((state) => state.languageCode);

export const localizationStoreActions = {
    setLanguageCode(languageCode: string) {
        localizationStore.setState({languageCode: languageCode});
    },
};

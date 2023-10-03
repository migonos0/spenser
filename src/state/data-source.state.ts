import {useDataSourceStore} from '../stores/data-source.store';

export const useIsDataSourceInitialized = () =>
  useDataSourceStore(state => state.isDataSourceInitialized);

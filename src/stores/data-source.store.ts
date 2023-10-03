import {create} from 'zustand';

interface DataSourceState {
  isDataSourceInitialized?: boolean;
}

export const useDataSourceStore = create<DataSourceState>(() => ({}));

export const dataSourceStoreActions = {
  setIsInitializedTrue() {
    useDataSourceStore.setState({isDataSourceInitialized: true});
  },
};

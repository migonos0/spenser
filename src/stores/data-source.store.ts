import {DataSource} from 'typeorm';
import {create} from 'zustand';

interface DataSourceState {
  dataSource?: DataSource;
}

export const useDataSourceStore = create<DataSourceState>(() => ({}));

export const dataSourceStoreActions = {
  setDataSource(dataSource?: DataSource) {
    useDataSourceStore.setState({dataSource: dataSource});
  },
};

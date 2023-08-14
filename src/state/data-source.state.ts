import {useDataSourceStore} from '../stores/data-source.store';

export const useDataSource = () =>
  useDataSourceStore(state => state.dataSource);

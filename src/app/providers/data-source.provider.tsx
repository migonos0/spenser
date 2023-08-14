import {ReactNode, useEffect} from 'react';

import {dataSourceStoreActions} from '../../stores/data-source.store';
import {dataSource} from '../../utilities/data-source';

interface DataSourceProviderProps {
  children?: ReactNode;
}

export const DataSourceProvider = (props: DataSourceProviderProps) => {
  useEffect(() => {
    dataSource
      .initialize()
      .then(() => {
        dataSourceStoreActions.setDataSource(dataSource);
      })
      .catch(() => {
        dataSourceStoreActions.setDataSource(undefined);
      });
  }, []);

  return <>{props.children}</>;
};

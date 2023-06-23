import {ReactNode, useCallback, useEffect} from 'react';
import {sqliteStoreActions} from '../../stores/sqlite.store';
import {getSQLiteDatabase} from '../../lib/sqlite';
import {DB_NAME} from '../../constants/db';
import {enablePromise} from 'react-native-sqlite-storage';
import {useSQLiteDatabase} from '../../state/sqlite.state';
import {createMessagesTable} from '../../service/message.service';

interface SQLiteProviderProps {
  children?: ReactNode;
}

export const SQLiteProvider = (props: SQLiteProviderProps) => {
  const sqliteDatabase = useSQLiteDatabase();
  const createTables = useCallback(async () => {
    if (!sqliteDatabase) {
      return;
    }

    try {
      await createMessagesTable(sqliteDatabase);
    } catch (error) {
      console.error(error);
    }
  }, [sqliteDatabase]);

  useEffect(() => {
    enablePromise(true);
    getSQLiteDatabase(DB_NAME).then(sqliteDatabase2 =>
      sqliteStoreActions.setSQLiteDatabase(sqliteDatabase2),
    );
  }, []);

  useEffect(() => {
    createTables().then(() =>
      sqliteStoreActions.updateAreTablesCreatedAsTrue(),
    );
  }, [createTables]);

  return <>{props.children}</>;
};

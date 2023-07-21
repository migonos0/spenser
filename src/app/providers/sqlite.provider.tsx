import {ReactNode, useCallback, useEffect} from 'react';
import {sqliteStoreActions} from '../../stores/sqlite.store';
import {getSQLiteDatabase} from '../../lib/sqlite';
import {DB_NAME} from '../../constants/db';
import {enablePromise} from 'react-native-sqlite-storage';
import {
  useSQLiteDatabase,
  useWithSQLiteDatabase,
} from '../../state/sqlite.state';
import {createMessagesTable} from '../../service/message.service';
import {createTagsTable} from '../../service/tag.service';

interface SQLiteProviderProps {
  children?: ReactNode;
}

export const SQLiteProvider = (props: SQLiteProviderProps) => {
  const sqliteDatabase = useSQLiteDatabase();
  const withSQLiteDatabase = useWithSQLiteDatabase();

  const createTables = useCallback(async () => {
    if (!sqliteDatabase) {
      return;
    }

    await createMessagesTable(sqliteDatabase);
    await createTagsTable(sqliteDatabase);
  }, [sqliteDatabase]);

  useEffect(() => {
    enablePromise(true);
    getSQLiteDatabase(DB_NAME).then(sqliteDatabase2 =>
      sqliteStoreActions.setSQLiteDatabase(sqliteDatabase2),
    );
  }, []);

  useEffect(() => {
    createTables()
      .then(() => sqliteStoreActions.updateAreTablesCreatedAsTrue())
      .catch(error => console.error(error));
  }, [createTables]);

  useEffect(() => {
    if (!withSQLiteDatabase || !sqliteDatabase) {
      return;
    }
    withSQLiteDatabase(sqliteDatabase);
  }, [withSQLiteDatabase, sqliteDatabase]);

  return <>{props.children}</>;
};

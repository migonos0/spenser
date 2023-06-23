import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {create} from 'zustand';

interface SQLiteState {
  sqliteDatabase?: SQLiteDatabase;
  areTablesCreated?: boolean;
}
export const useSQLiteStore = create<SQLiteState>(() => ({}));

export const sqliteStoreActions = {
  setSQLiteDatabase(sqliteDatabase: SQLiteDatabase) {
    useSQLiteStore.setState({sqliteDatabase: sqliteDatabase});
  },
  updateAreTablesCreatedAsTrue() {
    useSQLiteStore.setState({areTablesCreated: true});
  },
};

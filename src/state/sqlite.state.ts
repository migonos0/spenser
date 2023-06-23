import {useSQLiteStore} from '../stores/sqlite.store';

export const useSQLiteDatabase = () =>
  useSQLiteStore(state => state.sqliteDatabase);
export const useAreTablesCreated = () =>
  useSQLiteStore(state => state.areTablesCreated);

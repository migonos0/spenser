import {useSQLiteStore} from '../stores/sqlite.store';

export const useSQLiteDatabase = () =>
  useSQLiteStore(state => state.sqliteDatabase);
export const useAreTablesCreated = () =>
  useSQLiteStore(state => state.areTablesCreated);
export const useWithSQLiteDatabase = () =>
  useSQLiteStore(state => state.withSQLiteDatabase);

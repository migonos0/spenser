import {FC, ReactNode} from 'react';
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator';
import {drizzleDB} from '@/infra/drizzle/drizzle-db';
import migrations from '../infra/drizzle/migrations/migrations';
import {Text} from 'react-native';

type MigrationsProviderProps = {
  children?: ReactNode;
};
export const MigrationsProvider: FC<MigrationsProviderProps> = ({children}) => {
  const {success, error} = useMigrations(drizzleDB, migrations);

  if (!success) {
    return (
      <>
        <Text>{error?.message}</Text>
      </>
    );
  }

  return <>{children}</>;
};

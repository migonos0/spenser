import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "./drizzle-schema";
import { openDatabaseSync } from "expo-sqlite/next";

export const sqliteDB = openDatabaseSync("db.db");
export const drizzleDB = drizzle(sqliteDB, { schema });

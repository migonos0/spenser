import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  description: text("description").notNull(),
  isExpense: integer("is_expense", { mode: "boolean" }).notNull(),
  amount: real("amount").notNull().default(0),
});

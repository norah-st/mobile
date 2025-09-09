import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ordersTable = sqliteTable("work_orders", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull()
});

import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const SportsModel = sqliteTable("Sports", {
  name: text("name").notNull().unique().primaryKey(),
});

export default SportsModel;

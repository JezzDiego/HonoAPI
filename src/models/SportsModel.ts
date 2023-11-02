import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const SportsModel = sqliteTable("Sports", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export default SportsModel;

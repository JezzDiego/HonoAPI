import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

const UserModel = sqliteTable("Users", {
  id: integer("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export default UserModel;

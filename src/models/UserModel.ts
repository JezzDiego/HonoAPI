import { text, sqliteTable } from "drizzle-orm/sqlite-core";

const UserModel = sqliteTable("users", {
  id: text("id"),
  email: text("email"),
});

export default UserModel;

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: Bun.env.DATABASE_URI,
  authToken: Bun.env.DATABASE_AUTH_TOKEN,
});
const db = drizzle(client);

export default db;

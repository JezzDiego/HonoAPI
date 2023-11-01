import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import SportsModel from "./SportsModel";
import UserModel from "./UserModel";

const ReservationsModel = sqliteTable("Reservations", {
  id: integer("id").primaryKey(),
  client_name: text("client_name").notNull(),
  client_id: integer("client_id")
    .notNull()
    .references(() => UserModel.id),
  reservation_date: integer("reservation_date").notNull(),
  start_time: integer("start_time").notNull(),
  end_time: integer("end_time").notNull(),
  sport_type: text("sport_type")
    .notNull()
    .references(() => SportsModel.name),
  course: text("course").notNull(),
  class: text("class").notNull(),
});

export default ReservationsModel;

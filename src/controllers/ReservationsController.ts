import { Context, Env } from "hono";
import { sql } from "drizzle-orm";
import { LibsqlError } from "@libsql/client";
import ReservationsModel from "../models/ReservationsModel";
import db from "../utils/connection";

export default class ReservationsController {
  /**
   * Retrieves all reservations from the database.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the retrieved reservations.
   */
  public static async getAllReservations(c: Context<Env, "/reservations", {}>) {
    try {
      const result = await db.select().from(ReservationsModel).all();

      return c.json(result);
    } catch (error) {
      if (error instanceof LibsqlError) {
        return c.newResponse(`${error}`, error.rawCode);
      }

      return c.newResponse(`${error}`);
    }
  }

  /**
   * Retrieves a single reservation from the database by ID.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the retrieved reservation.
   */
  public static async getReservationById(
    c: Context<Env, "/reservations/:id", {}>
  ) {
    try {
      const result = await db
        .select()
        .from(ReservationsModel)
        .where(sql`id = ${c.req.param("id")}`);

      return c.json(result);
    } catch (error) {
      if (error instanceof LibsqlError) {
        return c.newResponse(`${error}`, error.rawCode);
      }

      return c.newResponse(`${error}`);
    }
  }

  /**
   * Creates a new reservation in the database.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the newly created reservation.
   */
  public static async createReservation(c: Context<Env, "/reservations", {}>) {
    try {
      const body = await c.req.json();
      const result = await db.insert(ReservationsModel).values({
        client_name: body["client_name"],
        client_id: body["client_id"],
        reservation_date: body["reservation_date"],
        start_time: body["start_time"],
        end_time: body["end_time"],
        sport_type: body["sport_type"],
        course: body["course"],
        class: body["class"],
      });

      return c.json(result);
    } catch (error) {
      if (error instanceof LibsqlError) {
        return c.newResponse(`${error}`, error.rawCode);
      }

      return c.newResponse(`${error}`);
    }
  }

  /**
   * Updates a reservation in the database by ID.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the updated reservation.
   */
  public static async updateReservationById(
    c: Context<Env, "/reservations/:id", {}>
  ) {
    try {
      const body = await c.req.json();
      const result = await db
        .update(ReservationsModel)
        .set({
          client_name: body["client_name"],
          client_id: body["client_id"],
          reservation_date: body["reservation_date"],
          start_time: body["start_time"],
          end_time: body["end_time"],
          sport_type: body["sport_type"],
          course: body["course"],
          class: body["class"],
        })
        .where(sql`id = ${c.req.param("id")}`);

      return c.json(result);
    } catch (error) {
      if (error instanceof LibsqlError) {
        return c.newResponse(`${error}`, error.rawCode);
      }

      return c.newResponse(`${error}`);
    }
  }

  /**
   * Deletes a reservation from the database by ID.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the deleted reservation.
   */
  public static async deleteReservationById(
    c: Context<Env, "/reservations/:id", {}>
  ) {
    try {
      const result = await db
        .delete(ReservationsModel)
        .where(sql`id = ${c.req.param("id")}`);

      return c.json(result);
    } catch (error) {
      if (error instanceof LibsqlError) {
        return c.newResponse(`${error}`, error.rawCode);
      }

      return c.newResponse(`${error}`);
    }
  }
}

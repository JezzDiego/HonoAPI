import { Context, Env } from "hono";
import { sql } from "drizzle-orm";
import { LibsqlError } from "@libsql/client";
import SportsModel from "../models/SportsModel";
import db from "../utils/connection";

export default class SportsController {
  /**
   * Retrieves all sports from the database.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the retrieved sports.
   */
  public static async getAllSports(c: Context<Env, "/sports", {}>) {
    try {
      const result = await db.select().from(SportsModel).all();

      return c.json(result);
    } catch (error) {
      if (error instanceof LibsqlError) {
        return c.newResponse(`${error}`, error.rawCode);
      }

      return c.newResponse(`${error}`);
    }
  }

  /**
   * Retrieves a single sport from the database by ID.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the retrieved sport.
   */
  public static async getSportById(c: Context<Env, "/sports/:id", {}>) {
    try {
      const result = await db
        .select()
        .from(SportsModel)
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
   * Creates a new sport in the database.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the newly created sport.
   */
  public static async createSport(c: Context<Env, "/sports", {}>) {
    try {
      const body = await c.req.json();

      const result = await db.insert(SportsModel).values({
        name: body["name"],
      });

      return c.json(result, 201);
    } catch (error) {
      if (error instanceof LibsqlError) {
        return c.newResponse(`${error}`, error.rawCode);
      }

      return c.newResponse(`${error}`);
    }
  }

  /**
   * Updates a sport in the database.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the updated sport.
   */
  public static async updateSportById(c: Context<Env, "/sports/:id", {}>) {
    try {
      const body = await c.req.json();

      const result = await db
        .update(SportsModel)
        .set({
          name: body["name"],
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
   * Deletes a sport from the database by ID.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the deleted sport.
   */
  public static async deleteSportById(c: Context<Env, "/sports/:id", {}>) {
    try {
      const result = await db
        .delete(SportsModel)
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

import { Context, Env } from "hono";
import { sql } from "drizzle-orm";
import { LibsqlError } from "@libsql/client";
import UserModel from "../models/UserModel";
import db from "../utils/connection";

export default class UserController {
  /**
   * Retrieves all users from the database.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the retrieved users.
   */
  public static async getAllUsers(c: Context<Env, "/users", {}>) {
    try {
      const result = await db.select().from(UserModel).all();

      return c.json(result);
    } catch (error) {
      if (error instanceof LibsqlError) {
        return c.newResponse(`${error}`, error.rawCode);
      }

      return c.newResponse(`${error}`);
    }
  }

  /**
   * Retrieves a single user from the database by ID.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the retrieved user.
   */
  public static async getUserById(c: Context<Env, "/users/:id", {}>) {
    try {
      const result = await db
        .select()
        .from(UserModel)
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
   * Creates a new user in the database.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the newly created user.
   */
  public static async createUser(c: Context<Env, "/users", {}>) {
    try {
      const body = await c.req.json();
      const hashedPassword = await Bun.password.hash(body["password"]);

      const result = await db.insert(UserModel).values({
        email: body["email"],
        name: body["name"],
        password: hashedPassword,
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
   * Updates an existing user in the database by ID.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the updated user.
   */
  public static async updateUserById(c: Context<Env, "/users/:id", {}>) {
    try {
      const body = await c.req.json();
      const result = await db
        .update(UserModel)
        .set({
          email: body["email"],
          name: body["name"],
          password: body["password"],
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
   * Deletes an existing user from the database by ID.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response indicating success or failure of the deletion.
   */
  public static async deleteUserById(c: Context<Env, "/users/:id", {}>) {
    try {
      const result = await db
        .delete(UserModel)
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

import UserModel from "../models/UserModel";
import { LibsqlError } from "@libsql/client";
import db from "../utils/connection";
import { Context, Env } from "hono";
import { sql } from "drizzle-orm";

class UserController {
  /**
   * Retrieves all users from the database.
   * @param c - The context object containing the request and response objects.
   * @returns A JSON response containing the retrieved users.
   */
  public static async getAllUsers(c: Context<Env, "/users", {}>) {
    try {
      const result = await db.select().from(UserModel).all();
      return c.json({
        response: result,
      });
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
      return c.json({
        response: result,
      });
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
  public static async createUser(
    c: Context<Env, "/user/create/:id/:email", {}>
  ) {
    try {
      const result = await db.insert(UserModel).values({
        id: c.req.param("id"),
        email: c.req.param("email"),
      });
      return c.json({
        response: result,
      });
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
  public static async updateUserById(c: Context<Env, "/users/:id/:email", {}>) {
    try {
      const result = await db
        .update(UserModel)
        .set({
          email: c.req.param("email"),
        })
        .where(sql`id = ${c.req.param("id")}`);
      return c.json({
        response: result,
      });
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
      return c.json({
        response: result,
      });
    } catch (error) {
      if (error instanceof LibsqlError) {
        return c.newResponse(`${error}`, error.rawCode);
      }

      return c.newResponse(`${error}`);
    }
  }
}

export default UserController;

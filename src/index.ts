import { Hono } from "hono";
import UserController from "./controllers/UsersController";

const app = new Hono();

app.get("/users", UserController.getAllUsers);
app.get("/users/:id", UserController.getUserById);
app.post("/users/create/:id/:email", UserController.createUser);
app.put("/users/update/:id/:email", UserController.updateUserById);
app.delete("/users/delete/:id", UserController.deleteUserById);

export default app;

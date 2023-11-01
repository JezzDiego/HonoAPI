import { Hono } from "hono";
import UserController from "./controllers/UsersController";

const app = new Hono();

app.get("/users", UserController.getAllUsers);
app.get("user/:id", UserController.getUserById);
app.post("/user/create/:id/:email", UserController.createUser);
app.put("/user/update/:id/:email", UserController.updateUserById);
app.delete("/user/delete/:id", UserController.deleteUserById);

export default app;

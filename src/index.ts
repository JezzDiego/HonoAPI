import { Hono } from "hono";
import UserController from "./controllers/UsersController";
import ReservationsController from "./controllers/ReservationsController";

const app = new Hono();

// Users routes
app.get("/users", UserController.getAllUsers);
app.get("/users/:id", UserController.getUserById);
app.post("/users", UserController.createUser);
app.patch("/users/:id", UserController.updateUserById);
app.delete("/users/:id", UserController.deleteUserById);

// Reservations routes
app.get("/reservations", ReservationsController.getAllReservations);
app.get("/reservations/:id", ReservationsController.getReservationById);
app.post("/reservations", ReservationsController.createReservation);
app.patch("/reservations/:id", ReservationsController.updateReservationById);
app.delete("/reservations/:id", ReservationsController.deleteReservationById);

export default app;

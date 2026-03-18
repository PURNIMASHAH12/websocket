import express from "express";
import dotenv from "dotenv";
import mongodb from "./config/db.js";
import connectDB from "./config/db.js";
import userRoutes from "./src/modules/users/users.routes.js";
import { initSocket } from "./config/server.config.js";
import http from "http";
//import { notification } from "./src/modules/notification/notification.controller.js";
import notificationRoute from "./src/modules/notification/notification.routes.js";


dotenv.config();

const app = express();
mongodb();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

const server = http.createServer(app)
initSocket(server)

app.use("/user", userRoutes);
app.use('/notification',notificationRoute);


app.get("/", (req, res) => {
  res.send("Welcome to the Role-Based Library System API");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "Resource not found",
    success: false,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Internal Server Error",
    success: false,
  });
});

server.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import test from "./routes/test.js";
import taskRouter from "./routes/taskRoutes.js";

import errorHandlerM from "./middleware/errorHandlerM.js";

const app = express();

dotenv.config();
connectDB();

//to avoid cors issue
const allowedOrigins = [
  "http://localhost:5173",
  "https://taskmanager-six-swart.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

//allow middlewares
app.use(express.json());

//test route
app.use("/test", test);

//task routes
app.use("/api/task", taskRouter);

//error middleware (global)
app.use(errorHandlerM);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

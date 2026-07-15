import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import test from "./routes/test.js";
import taskRouter from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";

import errorHandler from "./middleware/errorHandlerM.js";

const app = express();

dotenv.config();
connectDB(); //eshtablish a connection on database (mongodb)

//cors configuration
const allowedHttpsOrigins = [
  "http://localhost:5173",
  "https://taskmanager-six-swart.vercel.app",
];

app.use(
  cors({
    origin: allowedHttpsOrigins,
    credentials: true,
  }),
);

//allow middlewares - built in middleware responsible for parsing request json data into javascript object.
app.use(express.json());

//test route
app.use("/test", test);

app.get("/", (req, res) => {
  res.send("TaskManager Backend is running 🚀");
});

//task route
app.use("/api/task", taskRouter);

//user route
app.use("/api/user", userRouter);

//error middleware (global)
app.use(errorHandler);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

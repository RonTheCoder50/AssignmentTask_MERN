import express from "express";
const router = express.Router();

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";
import validateTask from "../middleware/validateTask.js";

import validateToken from "../middleware/validateTokenHandler.js";

router.use(validateToken);

//create task
router.post("/", validateTask, createTask);

//get all tasks
router.get("/", validateToken, getTasks); //test here jwt token

//get task via id
router.get("/:id", getTask);

//update task via id
router.put("/:id", validateTask, updateTask);

//delete task via id
router.delete("/:id", deleteTask);

export default router;

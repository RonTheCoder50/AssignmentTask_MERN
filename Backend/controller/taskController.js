import Task from "../model/task.js";
import asyncHandler from "express-async-handler";

//@desc creating a task
//@route POST /api/task
//@access private
const createTask = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const task = await Task.create({
    title,
    content,
    user_id: req.user.id,
  });

  if (!task) {
    return res.status(500).json({
      message: "failed to create task, internal server error",
    });
  }

  res.status(201).json(task);
});

//@desc get all tasks
//@route GET /api/task
//@access private
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user_id: req.user.id });
  res.status(200).json(tasks);
};

//@desc get a single task
//@route GET /api/task/:id
//@access private
const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({
      message: "Not Found",
    });
  }

  res.status(200).json(task);
};

//@desc update task
//@route PUT /api/task/:id
//@access private
const updateTask = async (req, res) => {
  const taskFound = await Task.findById(req.params.id);
  if (!taskFound) {
    res.status(404);
    throw new Error("Task not found!");
  }

  if (taskFound.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update others tasks!");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });

  if (updateTask) {
    res.status(200).json(updatedTask);
  } else {
    res.status(500);
    throw new Error("Internal Server Error!");
  }
};

//@desc delete a task
//@route DELETE /api/task/:id
//@access private
const deleteTask = async (req, res) => {
  const taskFound = await Task.findById(req.params.id);
  if (!taskFound) {
    res.status(404);
    throw new Error("Task not found!");
  }

  if (taskFound.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete others tasks!");
  }
  const task = await Task.deleteOne({ _id: req.params.id });

  if (task) {
    res.status(200).json({
      message: "Task Remove Successfully!",
    });
  } else {
    res.status(500);
    throw new Error("Internal Server Error!");
  }
};

export { createTask, getTasks, getTask, updateTask, deleteTask };

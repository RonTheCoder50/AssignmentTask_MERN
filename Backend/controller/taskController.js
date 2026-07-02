import Task from "../model/task.js";

//create task
const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  if (!task)
    return res.status(500).json({
      message: "failed to create task, internal server error",
    });

  res.status(201).json(task);
};

//get tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

//get task by id
const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({
      message: "Not Found",
    });
  }

  res.status(200).json(task);
};

//update task via id
const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });

  if (!task) {
    return res.status(404).json({
      message: "task not found!",
    });
  }

  res.status(200).json(task);
};

//delete task via id
const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({
      message: "task not found!",
    });
  }

  res.status(200).json({
    message: "Task Remove Successfully!",
  });
};

export { createTask, getTasks, getTask, updateTask, deleteTask };

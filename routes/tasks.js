const express = require("express");
const router = express.Router();

let tasks = [];

/**
 *
 */
router.get("/", (req, res) => {
  res.json(tasks);
});

// Create a new task
router.post("/", (req, res) => {
  const newTask = req.body;

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Get a specific task
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).send("Task not found");
  }
});

// Update a task
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  } else {
    res.status(404).send("Task not found");
  }
});

// Delete a task
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Task not found");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

let tasks = [];

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - completed
 *       properties:
 *         id:
 *           type: integer
 *           description: The task ID.
 *         name:
 *           type: string
 *           description: The task name.
 *         completed:
 *           type: boolean
 *           description: The task completion status.
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 */
router.get("/", (req, res) => {
  res.json(tasks);
});

// /**
//  * @swagger
//  * /tasks:
//  *   post:
//  *     summary: Create a new task
//  *     tags: [Tasks]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Task'
//  *     responses:
//  *       201:
//  *         description: New task created
//  *         content:
//  *            application/json:
//  *              schema:
//  *                $ref: '#/components/schemas/Task'
//  */
router.post("/", (req, res) => {
  const newTask = req.body;

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// /**
//  * @swagger
//  * /tasks/{id}:
//  *   get:
//  *     summary: Retrieve a task by ID
//  *     tags: [Tasks]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the task
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: A task
//  *         content:
//  *            application/json:
//  *              schema:
//  *                $ref: '#/components/schemas/Task'
//  *       404:
//  *         description: Task not found
//  */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).send("Task not found");
  }
});

// /**
//  * @swagger
//  * /tasks/{id}:
//  *   put:
//  *     summary: Update a task
//  *     tags: [Tasks]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the task
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Task'
//  *     responses:
//  *       200:
//  *         description: Task updated
//  *         content:
//  *            application/json:
//  *              schema:
//  *                $ref: '#/components/schemas/Task'
//  *       404:
//  *         description: Task not found
//  */
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

// /**
//  * @swagger
//  * /tasks/{id}:
//  *   delete:
//  *     summary: Delete a task
//  *     tags: [Tasks]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the task
//  *         schema:
//  *           type: string
//  *     responses:
//  *       204:
//  *         description: Task deleted
//  *       404:
//  *         description: Task not found
//  */
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

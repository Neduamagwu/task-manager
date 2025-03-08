const express = require("express");
const { registerUser, loginUser } = require("./userController");
const { createTask, getTasks, updateTask, deleteTask } = require("./taskController");

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Task Routes
router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;

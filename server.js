require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Import Task Model
const Task = require("./models/Task");

const app = express();
app.use(express.json());

const cors = require("cors")
app.use(cors());



// -------------------------------------
// CONNECT TO MONGODB
// -------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// -------------------------------------
// BASIC ROUTE
// -------------------------------------
app.get("/", (req, res) => {
  res.send("MongoDB + Node + Mongoose server is running!");
});

// -------------------------------------
// CRUD APIs
// -------------------------------------

// GET ALL TASKS
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// GET SINGLE TASK
app.get("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

// POST — ADD NEW TASK
app.post("/tasks", async (req, res) => {
  const newTask = await Task.create({
    title: req.body.title,
  });

  res.json({
    message: "Task added successfully!",
    task: newTask,
  });
});

// PUT — FULL UPDATE
app.put("/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({
    message: "Task updated successfully!",
    task: updatedTask,
  });
});

// PATCH — PARTIAL UPDATE
app.patch("/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({
    message: "Task partially updated!",
    task: updatedTask,
  });
});

// DELETE — REMOVE TASK
app.delete("/tasks/:id", async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);

  if (!deletedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({
    message: "Task deleted successfully!",
  });
});

// -------------------------------------
// START SERVER
// -------------------------------------
app.listen(4000, () => {
  console.log("Server running on port 4000");
});

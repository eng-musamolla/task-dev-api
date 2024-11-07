import express from "express";
import Task from "../models/Task.js"; // Make sure the path is correct
import multer from "multer";
import path from "path";
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Update a task
router.put("/:id", upload.array("files", 10), async (req, res) => {
  //   console.log("put/req.body", req.body);
  //   console.log("put/req.params.id", req.params.id);
  //   console.log("put/req.files", req.files);

  try {
    const filePaths = req.files.map((file) => file.path);

    // console.log("filePaths", filePaths);

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $push: { attachments: { $each: filePaths } } }, // Use $push with $each to add multiple file paths
      { new: true }
    );

    // console.log("updatedTask", updatedTask);
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  //   console.log("Post/req.body", req.body);

  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  const { status } = req.query;
  const query = status ? { status } : {};
  try {
    const tasks = await Task.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$status",
          tasks: { $push: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  //   console.log("delete/req.body", req.body);

  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; // Use ES module export

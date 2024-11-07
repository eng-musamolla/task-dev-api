import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js"; // Make sure the extension is .js

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", taskRoutes);

// Get the MONGO_URI from environment variables
const uri = process.env.MONGO_URI;

console.log("Connecting to MongoDB...");

// Connect to MongoDB using Mongoose
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully");
    // Start the server after the database is connected
    app.listen(PORT, () => {
      console.log(`Task-dev-API is listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

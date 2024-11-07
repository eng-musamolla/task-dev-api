import mongoose from "mongoose";

// Define the Mongoose Schema
const taskSchema = new mongoose.Schema(
  {
    client: {
      Name: {
        type: String,
        required: true,
      },
      photo: {
        type: String, // URL or file path for the photo or avatar
      },
    },
    assignee: {
      assigneeName: {
        type: String,
        required: true,
      },
      assigneePhoto: {
        type: String, // URL or file path for the photo or avatar
      },
    },
    description: {
      type: String,
      required: true,
    },
    task: {
      total: {
        type: Number,
        default: 0,
      },
      Completed: {
        type: Number,
        default: 0,
      },
    },
    likes: {
      user: {
        type: [String], // Array of user IDs
        default: [],
      },
      total: {
        type: Number,
        default: 0,
      },
    },
    comments: {
      user: {
        type: [String], // Array of user IDs
        default: [],
      },
      total: {
        type: Number,
        default: 0,
      },
    },
    attachments: {
      type: [String], // Array of URLs or file paths for attachments
      default: [],
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Incomplete",
        "To Do",
        "Doing",
        "Under Review",
        "Completed",
        "Overdue",
      ],
      required: true,
      default: "To Do",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);

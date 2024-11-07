import request from "supertest";
import express from "express";
import taskRoutes from "../taskRoutes"; // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use("/api/tasks", taskRoutes);

describe("Task Routes", () => {
  it("should create a new task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({
        client: {
          Name: "Client Name",
          photo: "http://example.com/photo.jpg",
        },
        assignee: {
          assigneeName: "Assignee Name",
          assigneePhoto: "http://example.com/assignee.jpg",
        },
        description: "This is a sample task description.",
        task: {
          total: 10,
          Completed: 5,
        },
        likes: {
          user: ["user1", "user2"],
          total: 2,
        },
        comments: {
          user: ["user1", "user2"],
          total: 2,
        },
        attachments: [
          "http://example.com/attachment1.jpg",
          "http://example.com/attachment2.jpg",
        ],
        dueDate: "2023-12-31T23:59:59.999Z",
        status: "To Do",
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });
});

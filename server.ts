import express from "express";
import cors from "cors";
import { db } from "./server/db"; // Updated path to match project structure
import { users } from "./shared/schema";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "username and email are required" });
  }

  try {
    const newUser = await db.insert(users).values({ username, email }).returning();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// 👇 This route will show something at /users
app.get("/users", async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Optional 👇 add this to fix the "Cannot GET /" message
app.get("/", (req, res) => {
  res.send("👋 Hello from the backend!");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("🚀 Server is running on http://0.0.0.0:3000 (publicly visible)");
});
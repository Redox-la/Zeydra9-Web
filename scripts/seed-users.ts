import { db } from "../server/db"; // Adjust if needed
import { users } from "../shared/schema";

async function seed() {
  try {
    const result = await db.insert(users).values({
      username: "admin",
      email: "admin@example.com",
    }).returning();

    console.log("✅ Seed successful:", result);
  } catch (error) {
    console.error("❌ Error seeding user:", error);
  }
}

seed();
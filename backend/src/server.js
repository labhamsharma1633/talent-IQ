import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API IS UP AND RUNNING" });
});

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "This is the books endpoint" });
});

// Serve frontend only in production
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Express 5 compatible wildcard route
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ✅ Connect to DB first, then start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`✅ Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

import express from "express";
import dotenv from "dotenv";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../front/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log("server started");
  });
});

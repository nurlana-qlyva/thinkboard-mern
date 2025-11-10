import express from "express";
import dotenv from "dotenv";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// middleware
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("server started");
  });
});

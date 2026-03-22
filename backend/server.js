import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse the incoming request with JSON payloads

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on PORT: ${PORT}`);
});

// XnfLNPg3hZWuDJI5
// 596812

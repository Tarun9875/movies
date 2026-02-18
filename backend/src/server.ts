import dotenv from "dotenv";
dotenv.config(); // 🔥 MUST BE FIRST LINE

import http from "http";
import app from "./app";
import { connectDB } from "./config/database";

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

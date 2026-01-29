import express from "express";
import cors from "cors";
import corsOptions from "./config/cors";
import routes from "./routes/index";

const app = express();

app.use(cors(corsOptions)); // ✅ IMPORTANT
app.use(express.json());

app.use("/api", routes);

app.get("/", (_req, res) => {
  res.send("Movie Booking Backend API is running 🚀");
});

export default app;

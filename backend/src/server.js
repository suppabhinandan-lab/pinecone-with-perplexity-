import express from "express";
import chatRoutes from "./routes/chatRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

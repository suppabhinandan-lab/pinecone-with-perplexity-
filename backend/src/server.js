import express from "express";
import chatRoutes from "./routes/chatRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;


app.use("/api", chatRoutes);

app.listen(PORT, () => console.log("🚀 Server running on port 5000"));

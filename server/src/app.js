import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import emailRoutes from "./routes/emailRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/emails", emailRoutes);

app.get("/api/health", (req, res) => {
   res.json({ message: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

export default app;

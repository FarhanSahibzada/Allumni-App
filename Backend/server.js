import express from "express";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send(new Date().toString().slice(0, 24));
});



import student from "./src/routes/studentRoute.js";
app.use("/api/student",student );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

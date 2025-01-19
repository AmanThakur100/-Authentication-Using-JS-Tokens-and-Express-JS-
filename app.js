import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import connectDb from "./config/connectdb.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors()); // cors connection

connectDb(DATABASE_URL); // database connection

app.use(express.json()); // json

app.use("/api/user", userRoutes); // load routes

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

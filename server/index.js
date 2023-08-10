import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/users.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => res.send("API routing is done here!"));
app.use("/users", router);

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "pomodro_timer",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server running successfully on port: http://localhost:${PORT}`
      )
    )
  )
  .catch((error) => console.log(error.message));

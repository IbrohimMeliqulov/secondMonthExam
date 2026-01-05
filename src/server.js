import { config } from "dotenv";
import express from "express";
import { mainRouter } from "./routes/mainRouter.js";
config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

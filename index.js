import express from "express";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import putRoutes from "./routes/put.js";
import deleteRoutes from "./routes/delete.js";
import getRoute from "./routes/get.js";
import getById from "./routes/getById.js";
import cors from "cors";
const app = express();
const PORT = 7700;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api", getRoute);
app.use("/api", postRoutes);
app.use("/api/posts", getById);
app.use("/api/posts", putRoutes);
app.use("/api/posts", deleteRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

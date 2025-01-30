import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import projectRoutes from "./routes/project-routes";
import taskRoutes from "./routes/task-routes";
import searchRoutes from "./routes/search-routes";
import userRoutes from "./routes/user-routes";
import teamRoutes from "./routes/team-routes";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Route");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);

const prisma = new PrismaClient();

app.post("/create-user", async (req, res) => {
  try {
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });
    res.json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: `Error creating user: ${error.message}` });
  }
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

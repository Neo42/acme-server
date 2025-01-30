import { Router } from "express";
import { getUsers, createUser, getUser } from "../controllers/user-controller";

const router = Router();

router.get("/", getUsers);
router.get("/:cognitoId", getUser);
router.post("/", createUser);

export default router;

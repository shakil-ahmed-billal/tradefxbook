import { Router } from "express";
import usersRoutes from "../modules/Users/users.routes";

const router = Router();

// API routes

router.use("/users", usersRoutes);

export default router;

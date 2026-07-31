import { Router } from "express";
import usersRoutes from "../modules/Users/users.routes";
import tradesRoutes from "../modules/Trades/trades.routes";
import dashboardRoutes from "../modules/Dashboard/dashboard.routes";

const router = Router();

// API routes
router.use("/users", usersRoutes);
router.use("/trades", tradesRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;

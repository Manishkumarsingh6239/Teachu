import express from "express";
import { getStreamToken } from "../controller/chatController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);

export default router;
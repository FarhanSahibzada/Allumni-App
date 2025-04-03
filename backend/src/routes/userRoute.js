import express from "express";
import { signUp, signIn } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn",signIn);

export default router;
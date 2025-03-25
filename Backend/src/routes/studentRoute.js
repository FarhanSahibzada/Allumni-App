import express from "express";
import { signUp, signIn } from "../controllers/studentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn",verifyToken, signIn);

export default router;

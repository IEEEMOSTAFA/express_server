import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router();


// http:/ localhost : 5000/auth
router.post("/login",authController.loginUser)

export const authRoutes = router;
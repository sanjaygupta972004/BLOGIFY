import { Router } from "express";

const router = Router();

import {
    signUp,
    signIn

} from "../controllers/user.controller.js";

// unsecured routes
router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);

export default router;  
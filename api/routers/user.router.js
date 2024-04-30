import { Router } from "express";

const router = Router();

import {
    signUp,
    signIn,
    signInWithGoogle

} from "../controllers/user.controller.js";

// unsecured routes
router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/google-auth").post(signInWithGoogle);

export default router;  
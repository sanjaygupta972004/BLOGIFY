import { Router } from "express";

const router = Router();

import { signIn } from "../controllers/user.controller.js";

router.route("/sign-in").post(signIn);

export default router;  
import { Router } from "express";

const router = Router();

import { signUp } from "../controllers/user.controller.js";

router.route("/sign-up").post(signUp);

export default router;  
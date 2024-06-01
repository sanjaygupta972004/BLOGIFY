import { Router } from "express";
import {jwtAuthVerify} from '../middlewares/jwtAuth.middleware.js';
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

import { createPost } from "../controllers/post.controller.js";


const router = Router();
router.use(jwtAuthVerify, isAdmin);

router.route("/createPost").post(createPost);
export default router;
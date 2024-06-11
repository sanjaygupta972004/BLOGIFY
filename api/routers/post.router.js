import { Router } from "express";
import {jwtAuthVerify} from '../middlewares/jwtAuth.middleware.js';
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

import { createPost,getPosts } from "../controllers/post.controller.js";


const router = Router();
router.use(jwtAuthVerify);

router.route("/createPost").post(createPost);
router.route("/getPosts").get(getPosts);
export default router;
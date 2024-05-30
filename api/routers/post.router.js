import { Router } from "express";
import {jwtAuthVerify} from '../middlewares/jwtAuth.middleware.js';
import { isAdmin } from "../middlewares/isAdmin.middleware.js";


const router = Router();

export default router;
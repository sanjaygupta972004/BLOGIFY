import { Router } from "express";

const router = Router();

import {
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    updateProfileImage,
    updateProfile,
    deleteUser

} from "../controllers/user.controller.js";
import { jwtAuthVerify } from "../middlewares/jwtAuth.middleware.js";

// unsecured routes
router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/google-auth").post(signInWithGoogle);

// secured routes
router.route("/update-profile-image/:userId").patch(jwtAuthVerify,updateProfileImage);
router.route("/update-profile/:userId").patch(jwtAuthVerify, updateProfile);
router.route("/sign-out").get(jwtAuthVerify, signOut);
router.route("/delete/:userId").delete(jwtAuthVerify, deleteUser);

export default router;  
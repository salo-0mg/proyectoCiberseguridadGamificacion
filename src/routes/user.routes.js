import { Router } from "express";
import * as userController from "../controllers/user.controller"
import {authJwt, } from "../middlewares"

const router = Router()

router.get('/profile', [authJwt.verifyToken], userController.getUserInfo);
router.get('/profileA', [authJwt.verifyToken, authJwt.isAdmin], userController.getAdminInfo);
router.post('/setSpamScore', [authJwt.verifyToken], userController.setUserSpamScore);
router.post('/setPhishingScore', [authJwt.verifyToken], userController.setUserPhishingScore);

export default router;
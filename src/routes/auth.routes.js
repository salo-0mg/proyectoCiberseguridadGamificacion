import { Router } from "express";
import * as authController from '../controllers/auth.controller'
import {verifySignup} from '../middlewares'

const router = Router()

router.post('/signup', [verifySignup.checkDuplicateEmail, verifySignup.checkRolesExists, verifySignup.checkBirth, verifySignup.checkPassword], authController.signUp)
router.post('/signin', authController.signIn)

export default router;
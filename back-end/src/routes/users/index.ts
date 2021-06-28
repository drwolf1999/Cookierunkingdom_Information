import express from "express";
const router = express.Router();

import UserController from '../../controllers/UserController';

router.get('/logout', UserController.Logout);
router.post('/login', UserController.Login);
router.post('/register', UserController.Register);

export default router;
import express from "express";
const router = express.Router();

import CookieController from "../../controllers/CookieController";

router.get('/:name', CookieController.Get);

export default router;
import express from "express";
const router = express.Router();

import CommentController from "../../controllers/CommentController";

router.get('/board/:boardId', CommentController.All);
router.post('/create/board/:boardId', CommentController.Write);

export default router;
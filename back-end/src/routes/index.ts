import express from "express";
const router = express.Router();

import deckRouter from "./deck/index";
import boardRouter from './board/index';
import commentRouter from './comment/index';
import cookieRouter from './cookie/index';
import userRouter from './users/index';

router.get('/', (req, res, next) => {
    console.log('init');
    return res.status(200).json({
        title: 'hi'
    });
});

router.use('/deck', deckRouter);
router.use('/board', boardRouter);
router.use('/comment', commentRouter);
router.use('/cookie', cookieRouter);
router.use('/user', userRouter);

export default router;
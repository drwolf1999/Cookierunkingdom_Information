import express from "express";
const router = express.Router();

import deckRouter from "./deck/index";

router.get('/', (req, res, next) => {
    console.log('init');
    return res.status(200).json({
        title: 'hi'
    });
});

router.use('/deck', deckRouter);

export default router;
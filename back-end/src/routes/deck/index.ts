import express from "express";
const router = express.Router();

import DeckController from "../../controllers/DeckController";

router.get('/', DeckController.All);
router.get('/get/:id', DeckController.Get);
router.post('/write', DeckController.Write);
router.get('/include', DeckController.Include);
router.post('/vote', DeckController.Vote);
router.post('/update', DeckController.Update);
router.post('/password', DeckController.CheckPassword);

export default router;
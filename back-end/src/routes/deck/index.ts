import express from "express";
const router = express.Router();

import DeckController from "../../controllers/DeckController";

router.get('/', DeckController.All);
router.post('/write', DeckController.Write);

export default router;
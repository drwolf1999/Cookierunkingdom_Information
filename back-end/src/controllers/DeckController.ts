import * as express from "express";
import Deck from "../models/deck";

export default {
    All: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const mode = req.query.mode;
            if (mode === undefined) {
                return res.status(400).json({
                    message: 'bad request'
                });
            }
            const ret = await Deck.find(
                {type: mode}
            ); // TODO pagination
            console.log(mode, ret)
            return res.status(200).json({
                decks: ret,
                message: 'success'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'error'
            });
        }
    },
    Write: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const type =  req.body.type;
        const tier = req.body.tier === '' ? 'U' : req.body.tier;
        const deckName = req.body.name;
        const units = req.body.units;
        try {
            let deck = new Deck({
                tier: tier,
                name: deckName,
                units: units,
                type: type,
            });
            deck = await deck.save();
            console.log(type, deck);
            return res.status(201).json({
                deck: deck,
                message: 'create success',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'error',
            });
        }
    },
}
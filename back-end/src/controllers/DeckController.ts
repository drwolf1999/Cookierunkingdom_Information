import * as express from "express";
import Deck from "../models/deck";
import CookieController from "./CookieController";
import VoteDeck from "../models/voteDeck";

export default {
    All: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const filter: Record<string, any> = {};
            const mode = req.query.mode;
            const includeCookie = req.query.include;
            if (mode === undefined) {
                return res.status(400).json({
                    message: 'bad request'
                });
            }
            filter[`type`] = mode;
            if (includeCookie !== undefined) {
                filter['units.cookie'] = {$all: includeCookie};
            }
            const ret = await Deck.find(
                filter
            ); // TODO pagination
            console.log(ret)
            return res.status(200).json({
                decks: ret,
                message: 'success'
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'error'
            });
        }
    },
    Write: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const type = req.body.type;
        const deckName = req.body.name;
        const units = req.body.units;
        try {
            let deck = new Deck({
                name: deckName,
                units,
                type,
            });
            const unitsSize = units.length;
            for (let i = 0; i < unitsSize; i++) {
                const tSize = units[i].topping.length;
                const param: Record<string, number> = {};
                for (let j = 0; j < tSize; j++) {
                    if (!Object.prototype.hasOwnProperty.call(param, units[i].topping[j])) {
                        param[units[i].topping[j]] = 1;
                        continue;
                    }
                    param[units[i].topping[j]] = param[units[i].topping[j]] + 1;
                }
                for (const p in param) {
                    if (Object.prototype.hasOwnProperty.call(param, p)) {
                        await CookieController.Write(units[i].cookie, p, param[p]);
                    }
                }
            }
            deck = await deck.save();
            return res.status(201).json({
                deck,
                message: 'create success',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'error',
            });
        }
    },
    Get: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.params.id;
        try {
            const ret = await Deck.find({id});
            if (ret.length !== 1) {
                return res.status(204).json({
                    message: 'some error',
                });
            }
            return res.status(200).json({
                deck: ret[0],
                message: 'success',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'error',
            });
        }
    },
    Include: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            console.log('info')
            const filter: Record<string, any> = {};
            const mode = req.query.mode;
            const includeCookie = req.query.include;
            if (mode === undefined || includeCookie === undefined || !Array.isArray(includeCookie)) {
                return res.status(400).json({
                    message: 'bad request'
                });
            }
            filter[`type`] = mode;
            const incCookieSize = includeCookie.length;
            if (incCookieSize > 3) {
                filter[`$or`] = [];
                for (let i = 0; i < incCookieSize; i++) {
                    const ar = [];
                    for (let j = 0; j < incCookieSize; j++) {
                        if (i !== j) {
                            ar.push(includeCookie[j]);
                        }
                    }
                    filter[`$or`].push({
                        'units.name': {
                            $all: ar
                        }
                    });
                }
            } else {
                filter[`units.name`] = {$all: includeCookie};
            }
            console.log(JSON.stringify(filter));
            const ret = await Deck.find(filter).limit(3);
            console.log(mode, ret)
            return res.status(200).json({
                decks: ret,
                message: 'success'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'error'
            });
        }
    },
    Vote: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const ip = req.body.ip;
        const deckId = req.body.deckId;
        try {
            const alreadyVoted = await VoteDeck.find({
                ip,
                deckId,
            });
            if (alreadyVoted.length > 0) {
                return res.status(201).json({
                    deck: null,
                    code: 0,
                    message: 'already voted',
                });
            }
            const vote = new VoteDeck({
                ip,
                deckId,
            });
            await vote.save();
            const newDeck = await Deck.findOneAndUpdate({id: deckId}, {$inc: {vote: 1}}, {new: true});
            console.log(newDeck)
            return res.status(201).json({
                deck: newDeck,
                code: 1,
                message: 'vote success'
            })
        } catch (error) {
            return res.status(500).json({
                deck: null,
                code: -1,
                message: 'server error'
            })
        }
    }
}
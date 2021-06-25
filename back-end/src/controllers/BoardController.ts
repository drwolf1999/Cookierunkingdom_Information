import * as express from "express";
import Board from "../models/board";
import Comment from "../models/comment";

export default {
    All: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const filter = {};
            const ret = await Board
                .find(filter)
                .select('-_id -__v')
                .limit(20); // TODO pagination
            // const boardComments: number[] = [];
            const retSize = ret.length;
            for (let i = 0; i < retSize; i++) {
                ret[i] = {...ret[i]}._doc;
                ret[i].commentSize = await Comment.countDocuments({boardId: ret[i].id})
                // boardComments.push(await Comment.countDocuments({boardId: ret[i].id}));
            }
            console.log(ret);
            return res.status(200).json({
                boards: ret,
                // commentSize: boardComments,
                message: 'success'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'error'
            });
        }
    },
    Write: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const username = req.body.username;
        const password = req.body.password;
        const title = req.body.title;
        const content = req.body.content;
        try {
            let board = new Board({
                id: 0,
                username,
                password,
                title,
                content,
            });
            board = await board.save();
            console.log(board)
            return res.status(201).json({
                board,
                message: 'create success',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'error',
            });
        }
    },
    GetById: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const id = req.params.id;
            const ret = await Board.findOne({id}, '-_id -__v -id -password');
            return res.status(200).json({
                board: ret,
                message: 'success'
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'error'
            });
        }
    },
}
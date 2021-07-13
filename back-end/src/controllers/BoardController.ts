import * as express from "express";
import * as HashModule from "../middleware/hash";
import Board from "../models/board";
import Comment from "../models/comment";

export default {
    All: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const pageSize = 20;
            const query = req.query.query === undefined || req.query.query === null ? '' : req.query.query;
            const page: number = req.query.page === undefined || req.query.page === null ? 1 : req.query.page as any;
            let ret = [];
            let filter = {};
            if (query !== '') {
                filter = {
                    $or: [
                        {
                            $or: [
                                {"title": {$regex: query, $options: 'i'}},
                                {"content": {$regex: query, $options: 'i'}},
                            ]
                        },
                        {
                            $text: {$search: query, $caseSensitive: false}
                        }
                    ]
                };
            }
            ret = await Board.find(filter)
                .select('-_id -__v')
                .sort({id: -1});
            const boardSize = ret.length;
            ret = await Board.find(filter)
                .select('-_id -__v')
                .sort({id: -1})
                .limit(pageSize)
                .skip(pageSize * (page - 1));
            // const boardComments: number[] = [];
            const retSize = ret.length;
            for (let i = 0; i < retSize; i++) {
                const r = {...ret[i]}._doc;
                Object.assign(r, {commentSize: await Comment.countDocuments({boardId: ret[i].id})});
                ret[i] = r;
                // boardComments.push(await Comment.countDocuments({boardId: ret[i].id}));
            }
            return res.status(200).json({
                boards: ret,
                allBoardSize: boardSize / pageSize + (boardSize % pageSize > 0 ? 1 : 0),
                // commentSize: boardComments,
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
        const username = req.body.username;
        const password = req.body.password;
        const title = req.body.title;
        const content = req.body.content;
        try {
            const hashPwd = HashModule.hash(password);
            let board = new Board({
                id: 0,
                username,
                password: hashPwd,
                title,
                content,
            });
            board = await board.save();
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
            // tslint:disable-next-line:radix
            const id = parseInt(req.params.id);
            const ret = await Board.findOne({id}, '-_id -__v -password');
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
    Update: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.body.id;
        const username = req.body.username;
        const password = req.body.password;
        const title = req.body.title;
        const content = req.body.content;
        try {
            const result = await Board.findOneAndUpdate({id}, {username, password, title, content}, {new: true,});
            return res.status(201).json({
                board: result,
                message: 'create success',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'error',
            });
        }
    },
    CheckPassword: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.body.id;
        const password = req.body.password;
        try {
            const board = await Board.findOne({id});
            if (!board) {
                return res.status(404).json({
                    code: 0,
                    message: 'valid board id',
                });
            }
            if (HashModule.compare(password, board.password)) {
                return res.status(201).json({
                    code: 1,
                    message: 'ok',
                })
            }
            return res.status(201).json({
                code: 0,
                message: 'password not matched',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'error',
            });
        }
    },
}
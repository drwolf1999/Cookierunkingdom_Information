import * as express from "express";
import Comment from "../models/comment";
import comment from "../../../front-end/src/service/comment";

export default {
    All: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const boardId = req.params.boardId;
            const filter: Record<string, unknown> = {};
            filter[`boardId`] = boardId;
            const comments = await Comment.find(filter).select('-_id -__v').sort({id: 1});
            const commentsSize = comments.length;
            const ret: Record<string, any>[] = [];
            let retSize = 0;
            const mapping: Record<number, number> = {};
            for (let i = 0; i < commentsSize; i++) {
                const c = comments[i];
                console.log(c)
                if (c.parentComment === -1) {
                    ret.push({...c}._doc);
                    ret[retSize][`reply`] = [];
                    mapping[c.id] = retSize;
                    retSize++;
                } else {
                    const idx = mapping[c.parentComment];
                    ret[idx].reply.push(c);
                }
            }
            console.log(ret)
            return res.status(200).json({
                comments: ret,
                length: commentsSize,
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
        const boardId = req.params.boardId;
        const username = req.body.username;
        const password = req.body.password;
        const content = req.body.content;
        const parentComment = req.body.parentComment;
        console.log(boardId, username, password, content, parentComment)
        try {
            let board = new Comment({
                boardId,
                username,
                password,
                content,
                parentComment
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
}
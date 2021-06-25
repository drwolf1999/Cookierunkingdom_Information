import * as mongoose from "mongoose";
import {AutoIncrementID} from '@typegoose/auto-increment';

import moment from 'moment';

const CommentSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 1,
        unique: true,
    },
    boardId: {
        type: Number,
    },
    parentComment: {
        type: Number,
        default: -1,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: () => moment().format("YYYY-MM-DD hh:mm:ss a")
    }
});

CommentSchema.plugin(AutoIncrementID, {
    field: 'id',
    startAt: 1000
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
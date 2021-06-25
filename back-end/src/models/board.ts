import * as mongoose from "mongoose";
import {AutoIncrementID} from '@typegoose/auto-increment';

import moment from 'moment';

const BoardSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 1,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    title: {
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

BoardSchema.plugin(AutoIncrementID, {
    field: 'id',
    startAt: 1000
});

const Board = mongoose.model('Board', BoardSchema);

export default Board;
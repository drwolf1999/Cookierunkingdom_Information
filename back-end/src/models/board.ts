import mongoose, {Schema, Model} from "mongoose";
import {AutoIncrementID} from '@typegoose/auto-increment';

import moment from 'moment';

interface IBoard {
    id: number,
    username: string,
    password: string,
    title: string,
    content: string,
    date: string
}

// tslint:disable-next-line:no-empty-interface
interface IBoardDocument extends Document {
    //
}

interface IBoardModel extends Model<IBoardDocument> {
    search: (query: string, callback: (...arg: any) => void) => Promise<any>;
}

const BoardSchema: Schema<IBoard> = new Schema({
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
        index: true,
    },
    content: {
        type: String,
        required: true,
        index: true,
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

BoardSchema.index({title: 'text', content: 'text'});

const Board = mongoose.model('Board', BoardSchema);

Board.createIndexes()

export default Board;
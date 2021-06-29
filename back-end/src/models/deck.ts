import * as mongoose from "mongoose";
import {AutoIncrementID} from "@typegoose/auto-increment";

const DeckSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 1,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    units: {
        type: [mongoose.Schema.Types.Mixed],
        validate: {
            validator: (v: any) => {
                if (!Array.isArray(v)) {
                    return false;
                }
                const Size = v.length;
                if (Size > 5) {
                    return false;
                }
                for (let i = 0; i < Size; i++) {
                    if (!Object.prototype.hasOwnProperty.call(v[i], 'cookie')) {
                        return false;
                    }
                    if (!Object.prototype.hasOwnProperty.call(v[i], 'topping')) {
                        return false;
                    }
                    if (!Object.prototype.hasOwnProperty.call(v[i], 'comment')) {
                        return false;
                    }
                    const keySize = Object.keys(v[i]).length;
                    if (keySize > 3) {
                        return false;
                    }
                    if (!Array.isArray(v[i].topping)) {
                        return false;
                    }
                    if (v[i].topping.length > 5) {
                        return false;
                    }
                }
                return true;
            },
            message: props => `${props.value} is not valid units`
        }
    },
    treasures: {
        type: [String],
        validate: {
            validator: (v: any) => {
                if (!Array.isArray(v)) {
                    return false;
                }
                return v.length <= 3;
            },
            message: props => `${props.value} is not valid treasures`
        }
    },
    type: {
        type: String,
        enum: {
            values: ['story', 'arena', 'guild'],
            message: '{VALUE} is not supported'
        },
        default: 'story'
    },
    vote: {
        type: Number,
        default: 0,
    },
    password: {
        type: String,
        require: true,
    },
});

DeckSchema.plugin(AutoIncrementID, {
    field: 'id',
    startAt: 1
});

const Deck = mongoose.model('deck', DeckSchema);

export default Deck;
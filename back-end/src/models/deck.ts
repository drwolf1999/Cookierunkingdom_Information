import * as mongoose from "mongoose";

const DeckSchema = new mongoose.Schema({
    tier: {
        type: String,
        enum: {
            values: ['U', 'C', 'B', 'A', 'S'],
            message: '{VALUE} is not supported'
        }
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
                    if (!Object.prototype.hasOwnProperty.call(v[i], 'name')) {
                        return false;
                    }
                    if (!Object.prototype.hasOwnProperty.call(v[i], 'topping')) {
                        return false;
                    }
                    const keySize = Object.keys(v[i]).length;
                    if (keySize === 3) {
                        if (!Object.prototype.hasOwnProperty.call(v[i], 'comment')) {
                            return false;
                        }
                    } else if (keySize > 3) {
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
    type: {
        type: String,
        enum: {
            values: ['story', 'arena', 'guild'],
            message: '{VALUE} is not supported'
        },
        default: 'story'
    }
});

const Deck = mongoose.model('deck', DeckSchema);

export default Deck;
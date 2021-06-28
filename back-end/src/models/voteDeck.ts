import * as mongoose from "mongoose";

const VoteDeckSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    deckId: {
        type: Number,
        required: true,
    },
});

const VoteDeck = mongoose.model('VoteDeck', VoteDeckSchema);

export default VoteDeck;
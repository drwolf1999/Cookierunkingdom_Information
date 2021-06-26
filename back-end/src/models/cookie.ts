import * as mongoose from "mongoose";

const CookieSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    topping: {
        type: String,
    },
    cnt: {
        type: Number,
        default: 1,
    }
});

const Cookie = mongoose.model('Cookie', CookieSchema);

export default Cookie;
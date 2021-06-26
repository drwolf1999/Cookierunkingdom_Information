import * as express from "express";
import Cookie from "../models/cookie"

export default {
    Get: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const name = req.params.name;
            const query = await Cookie.find({name})
                .limit(4)
                .sort({cnt: 1});
            const ret: string[] = [];
            for (let i = query.length - 1; i >= 0; i--) {
                ret.push(query[i].topping);
            }
            return res.status(200).json({
                goodTopping: ret,
                message: 'success'
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'error'
            });
        }
    },
    Write: async (name: string, topping: string, cnt: number) => {
        try {
            let ret = await Cookie.find({name, topping});
            if (ret.length === 0) {
                ret = new Cookie({
                    name,
                    topping,
                    cnt,
                });
                ret = await ret.save();
            } else if (ret.length === 1) {
                ret = await Cookie.findOneAndUpdate({name, topping}, {$inc: {'cnt': cnt}}, {new: true});
            } else { // impossible
                return 500;
            }
            return 201;
        } catch (error) {
            console.log(error);
            return 500;
        }
    },
}
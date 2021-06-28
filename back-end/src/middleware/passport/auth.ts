import {Request, Response, NextFunction} from "express";

import jwt  from 'jsonwebtoken';
import Secret from '../../constants/Secret';
module.exports = {
    isLoginSession:  (req: Request, res: Response, next: NextFunction) => {
        try {
            next();
            // @ts-ignore
            const decode = jwt.verify(req.headers['access-token'], Secret.JWT_TOKEN);
            // @ts-ignore
            req[`userData`] = decode;
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Auth Failed',
            });
        }
    }
};
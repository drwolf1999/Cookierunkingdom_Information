import * as express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import Secret from "../constants/Secret";

export default {
    Login: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // tslint:disable-next-line:one-variable-per-declaration
        const username = req.body.username,
            password = req.body.password;
        console.log(username, password);
        try {
            const user = await User.findOne({username}).exec();
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed',
                });
            }
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({username: user.username}, Secret.JWT_TOKEN, {expiresIn: "6h"});
                return res.status(200)
                    .header('Access-Token', token)
                    .json({
                        message: 'Auth Successful',
                    });
            }
        } catch (error) {
            return res.status(401).json({
                message: 'Auth failed',
            });
        }
    },
    Logout: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        req.logout();
        next();
    },
    Register: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const username = req.body.username;
        const password = req.body.password;
        const nickname = req.body.nickname;
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            let user = new User({
                username,
                password: hash,
                nickname,
            });
            user = await user.save();
            return res.status(201).json({
                message: 'Created user successfully',
                user,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'some error',
            });
        }
    }
}
/**
 * Required External Modules
 */
import express, {Request, Response, NextFunction} from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import logger from 'morgan';
import moment from "moment";
import 'moment-timezone';
import path from "path";
import dotenv from "dotenv";

import router from "./routes";

/**
 * App Variables
 */
const app = express();
const port = 3000; // default port to listen

/**
 *  App Configuration
 */

moment.tz.setDefault("Asia/Seoul")

dotenv.config({
    path: path.resolve(
        process.cwd(),
        process.env.NODE_ENV = "production" ? ".env.local" : ".env.local"
    )
});

/**
 * DB 설정
 */
// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
import constantsSecret from "./constants";
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
mongoose.set('useCreateIndex', true);
mongoose.connect(constantsSecret.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    auth: {
        user: constantsSecret.user,
        password: constantsSecret.pwd,
    }
})
    .then(() => {
        // mongoose.connection.db.dropDatabase();
        console.log('Connected to mongod Server Successfully');
    })
    .catch((error) => {
        console.log('error : ' + error);
    });

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// CORS handling
// 브라우저 보안 문제.
// 브라우저만! postman 등 툴은 상관 없음.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, Access-Token, Uid');
    res.header('Access-Control-Expose-Headers', 'Origin, Content-Type, Accept, Authorization, Access-Token, Uid');
    // 브라우저가 요청 보내기 전에 보냄.
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    // 계속 진행
    next();
});


// define a route handler for the default home page
app.use('/', router);


interface Error {
    status?: number;
    message?: string;
}

// catch 404 and forward to error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error
    });
});


/**
 * Server Activation
 */
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
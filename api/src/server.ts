import express, {Request} from "express";
import config from './config/config';
import connectDb from "./db/dbConnection";
import errHandler from './middleware/errHandler';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import cors from 'cors';


// all routes
import auth from './routes/api/auth.route';
import booking from './routes/api/booking.route';

const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

// body parser
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors({origin:"http://localhost:3000", credentials:true}));

app.use(`${config.API}`, auth);
app.use(`${config.API}`, booking);

// error handler for catching errors;
app.use(errHandler)

// passposrt
app.use(passport.initialize());
require('./auth/passport')(passport);

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});

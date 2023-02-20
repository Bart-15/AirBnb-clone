import { Request  } from "express";
import path from "path";
import dotenv from "dotenv";
import User from '../models/user.model';

import passportJWT from 'passport-jwt';

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const JWTStrategy = passportJWT.Strategy;

const SECRET_KEY = process.env.SECRET_KEY as string;

const cookieExtractor = function(req: Request) {
    let token = null;
    if(req && req.cookies){
        token = req.cookies['jwt']
    }
    return token;
}

module.exports = (passport: { use: (arg0: string, arg1: passportJWT.Strategy) => void; }) => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: SECRET_KEY
    }, async(jwt_payload, done) => {
        try {
            const {expiration} = jwt_payload;
            if (Date.now() > expiration) {
                done('Unauthorized', false)
            }

            const user = await User.findById(jwt_payload.id).select("-password")
            if(!user) {
                return done(null, false)
            } 

            return done(null, user)
        } catch(e) {
            console.log(e)
        }
        
    })) 
}
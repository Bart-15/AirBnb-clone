import { Request, Response, NextFunction  } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TUserDoc } from '../types/user.types';
import {
    CreateUserInput,
    LoginUserInput
} from '../schema/user.schema';
import {
    createUser,
    findUserByEmail,
    findUserById
} from '../service/user.service';

const secret = process.env.SECRET_KEY as string;


export async function signUp(
    req: Request<{}, {}, CreateUserInput>, 
    res: Response, 
    next: NextFunction){
    
    const {name, email, password} = req.body;
    try {
        //check user
        const user = await findUserByEmail(email);
        if(user) return res.status(400).json({success: false, message:"Email is already taken."})
        
        const hashedPass = bcrypt.hashSync(password, 10);

        const newUser = await createUser({
            name,
            email,
            password:hashedPass
        });

        res.status(200).json({
            success: true,
            message:"User created successfully",
            newUser
        });
    }catch(e) {
        next(e);
    }
}

export async function login(
    req: Request<{}, {}, LoginUserInput>, 
    res: Response, 
    next: NextFunction
    ){
    
    const { email, password} = req.body;
    try {
        const user = await findUserByEmail(email);
        if(!user) return res.status(404).json({success: false, message:"User not found"});
        
        const comparePass = await bcrypt.compare(password, user.password);
        if(!comparePass) return res.status(400).json({success: false, message:"User not found"})

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        const token = jwt.sign(payload, secret, {expiresIn: 3600});

        res.cookie('jwt', token, {sameSite:'strict', httpOnly: true, secure:false, path:'/'})
            .status(200).json({
                success:true,
                token: token,
                payload,
                message:"You have logedin."
            });
    }catch(e) {
        next(e);
    }
}

export async function logout(
    req: Request, 
    res: Response, 
    next: NextFunction
    ){
    try {
        if(req.cookies['jwt']){
            res.clearCookie('jwt').status(200).json({
                success:true,
                message:"You have logged out."
            });
        } else {
            res.status(401).json({
                error: 'Invalid jwt'
            });
        }
    }catch(e) {
        next(e);
    } 
}

export async function profile(
    req: Request, 
    res: Response, 
    next: NextFunction
    ){
    try {
        const user  = req.user as TUserDoc;

        const profile = await findUserById(user.id);
        
        if(!profile) return res.status(404).json({success: false, message:"User not found"});

        res.status(200).json({
            success: true,
            user: profile,
        });
    }catch(e) {
        next(e);
    }
}
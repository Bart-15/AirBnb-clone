import { IUser } from "../types/user.types";
import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique:true
    },
    password: {
        type:String
    } 
});

const User = model<IUser>("User", userSchema);

export default User;

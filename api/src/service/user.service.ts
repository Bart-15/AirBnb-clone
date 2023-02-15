import User from '../models/user.model';
import {IUser} from '../types/user.types'

export function createUser(input: Partial<IUser>) {
    return User.create(input);
}

export function findUserByEmail(input:string) {
    return User.findOne({email: input});
}

export function findUserById(input:string) {
    return User.findById(input).select("-password")
}
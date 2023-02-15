import { Date, ObjectId } from "mongoose";

export interface IBooking {
    place:string;
    user:string;
    checkIn:Date;
    checkOut:Date;
    name:string;
    phone:string;
    price:number;
}
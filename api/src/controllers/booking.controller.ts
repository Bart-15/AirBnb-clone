import { Request, Response, NextFunction } from "express";
import { CreateBookingInput } from "../schema/booking.schema";
import { TUserDoc } from '../types/user.types';
import { createBooking, deleteBookingById, findBookingById, getUserBookings } from '../service/booking.service';
import { AppError } from "../middleware/errHandler";

export async function addBooking(
    req: Request<{}, {}, CreateBookingInput>, 
    res: Response, 
    next: NextFunction
    ){
    try {
        const authUser = req.user as TUserDoc;

        const { place, checkIn, checkOut, name, phone, price } = req.body;

        const booking =  await createBooking({ place, checkIn, checkOut, name, phone, price, user:authUser.id });

        res.status(200).json({
            success: true,
            booking
        })
    }catch(e) {
        next(e);
    }   
}

export async function getBookings(
    req: Request, 
    res: Response, 
    next: NextFunction
    ){
    try {
        const authUser = req.user as TUserDoc;

        const bookings = await getUserBookings(authUser.id);

        res.status(200).json({
            success: true,
            bookings
        });
    }catch(e) {
        next(e);
    }
}

export async function destroyBooking(
    req: Request<{id:string}>, 
    res: Response, 
    next: NextFunction
    ){
    try{
        const authUser = req.user as TUserDoc;
        const booking = await findBookingById(req.params.id);

        if(!booking) throw new AppError(404, "Booking not found.");

        if(booking?.user.toString()  !== authUser.id) throw new AppError(401, "Unauthorized");

        await deleteBookingById(req.params.id);

        res.status(200).json({
            success: true,
            message:"Booking deleted Successfully"
        });
    }catch(e) {
        next(e);
    }
}
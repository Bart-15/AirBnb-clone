import { Request, Response, NextFunction  } from "express";
import { CreateBookingInput } from "../schema/booking.schema";


export async function createBooking(
    req: Request<{}, {}, CreateBookingInput>, 
    res: Response, 
    next: NextFunction
    ) {

}
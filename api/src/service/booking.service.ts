import Booking from "../models/booking.model";
import { IBooking } from "../types/booking.types";


export function createBooking(input: Partial<IBooking>){
    return Booking.create(input);
}

export function getUserBookings(id: string) {
    return Booking.find({user:id}).populate('place');
}

export function findBookingById(id:string){
    return Booking.findById(id);
}

export function deleteBookingById(id:string){
    return Booking.findByIdAndDelete(id);
}
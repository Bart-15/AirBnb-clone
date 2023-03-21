import { model, Schema } from 'mongoose';
import { IBooking } from '../types/booking.types';

const bookingSchema = new Schema({
    place: {
        type:Schema.Types.ObjectId, 
        required:true, 
        ref:'Place'
    },
    user: {
        type:Schema.Types.ObjectId, 
        required:true
    },
    checkIn: {
        type:Date, 
        required:true
    },
    checkOut: {
        type:Date, 
        required:true
    },
    name: {
        type:String, 
        required:true
    },
    numberOfGuests: {
        type:Number, 
        required:true
    },
    phone: {
        type:String, 
        required:true
    },
    price: {
        type:Number
    }
})

const Booking = model<IBooking>("Booking", bookingSchema);

export default Booking;
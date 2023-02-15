import { model, Schema } from 'mongoose';
import { IPlace } from '../types/place.types';

const placeSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String
    },
    address: {
        type:String
    },
    photos:{
        type:[String]
    },
    extraInfo:{
        type:String
    },
    checkIn:{
        type:Number
    },
    checkOut:{
        type:Number
    },
    maxGuests:{
        type:Number
    },
    price:{
        type:Number
    }
})

const Place = model<IPlace>("Place", placeSchema);
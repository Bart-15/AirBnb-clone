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
    images:{
        type:[String]
    },
    description:{
        type:String
    },
    small_description: {
        type:String
    },
    perks: {
        type:[String]
    },
    checkIn:{
        type:String
    },
    checkOut:{
        type:String
    },
    maxGuests:{
        type:Number
    },
    price:{
        type:Number
    }
})

const Place = model<IPlace>("Place", placeSchema);

export default Place;
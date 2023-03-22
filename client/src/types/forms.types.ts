export type TFormPlaceInput = {
    _id?:string;
    description: string;
    small_description: string;
    title: string;
    address:string;
    checkIn:string;
    images?:string[];
    checkOut:string;
    perks:string[];
    maxGuests:string;
    price:string;
}

export type TPerks = {
    _id:string;
    name:string;
    path:string;
}

export type TBookingInput = {
    _id:string;
    user:string;
    name:string;
    place:string | TFormPlaceInput;
    checkIn:string;
    checkOut:string;
    phone:string;
    numberOfGuests:number;
    price:number;
}

export interface IBooking extends TBookingInput  {
    place: TFormPlaceInput
}
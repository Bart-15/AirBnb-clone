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
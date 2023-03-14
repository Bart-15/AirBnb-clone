export type TFormPlaceInput = {
    description: any;
    small_description: any;
    title: string;
    address:string;
    checkIn:string;
    checkOut:string;
    extraInfo:string;
    maxGuests:string;
    price:string;
}

export type TPerks = {
    _id:string;
    name:string;
    path:string;
}
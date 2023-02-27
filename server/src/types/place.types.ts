export interface IPlace {
    owner: string;
    title: string;
    address:string;
    thumbnail:string;
    photos:string[];
    extraInfo:string;
    checkIn:number;
    checkOut:number;
    maxGuests:number;
    price:number;
}
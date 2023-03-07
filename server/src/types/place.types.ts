export interface IPlace {
    owner: string;
    title: string;
    address:string;
    images:string[];
    extraInfo:string;
    checkIn:number;
    checkOut:number;
    maxGuests:number;
    price:number;
}
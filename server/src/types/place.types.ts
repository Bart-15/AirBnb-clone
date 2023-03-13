export interface IPlace {
    owner: string;
    title: string;
    address:string;
    images:string[];
    perks:string[],
    description:string;
    small_description:string;
    checkIn:string;
    checkOut:string;
    maxGuests:number;
    price:number;
}
import {object, string, TypeOf, array, number} from "zod";

export const createPlaceSchema = object({
    body: object({
        title: string().trim().min(1, {message: "Title is required."}),
        address: string().trim().min(1, {message: "Address is required."}),
        photos: string({required_error: 'Photos required'}).array().min(1),
        extraInfo: string().trim().min(1, {message: "ExtraInfo is required."}),
        checkOut: number(),
        maxGuests: number().positive(),
        price: number().positive(),
    })
});

export type CreatePlaceInput = TypeOf<typeof createPlaceSchema>["body"];


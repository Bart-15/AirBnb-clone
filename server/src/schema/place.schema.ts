import {object, string, TypeOf, array, number, any} from "zod";


export const createPlaceSchema = object({
    body: object({
        title: string().trim().min(1, {message: "Title is required."}),
        address: string().trim().min(1, {message: "Address is required."}),
        images: string({required_error: 'Photos required'}).array().optional(),
        perks: string({required_error: 'Photos required'}).array().optional(),
        description: string().trim().min(1, {message: "Description is required."}),
        small_description: string().trim().min(1, {message: "Small description is required."}),
        checkIn: string().trim().min(1, {message: "Checkin is required."}),
        checkOut: string().trim().min(1, {message: "Checkin is required."}),
        maxGuests: number().positive(),
        price: number().positive(),
    })
});

export type CreatePlaceInput = TypeOf<typeof createPlaceSchema>["body"];


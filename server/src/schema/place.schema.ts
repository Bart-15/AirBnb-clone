import {object, string, TypeOf, array, number, any} from "zod";

const MAX_IMG_SIZE: number = 2000;
const ACCEPTED_IMG_TYPES: string[] = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createPlaceSchema = object({
    body: object({
        title: string().trim().min(1, {message: "Title is required."}),
        address: string().trim().min(1, {message: "Address is required."}),
        thumbnail: any()
        .refine((file) =>  file?.size <= MAX_IMG_SIZE, 'Max image size is 2MB')
        .refine((file) => ACCEPTED_IMG_TYPES.includes(file?.type), ".jpg, .jpeg, .png, and .webp formats are supported"),
        photos: string({required_error: 'Photos required'}).array(),
        extraInfo: string().trim().min(1, {message: "ExtraInfo is required."}),
        checkOut: string().trim().min(1, {message: "Checkout is required."}),
        maxGuests: string().trim().min(1, {message: "Maxguests is required."}),
        price: string().trim().min(1, {message: "Price is required."}),
    })
});

export type CreatePlaceInput = TypeOf<typeof createPlaceSchema>["body"];


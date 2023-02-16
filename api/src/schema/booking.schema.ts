import { object, string, TypeOf, number, date } from "zod";
export const ISO_DATE_REGEX = /\d{4}-[01]\d-[0-3]\d/;

export const createBookingSchema = object({
    body: object({
        place: string().trim().min(1, {message: "Place is required."}),
        checkIn: string().regex(ISO_DATE_REGEX , 'Date must be a valid ISO date'),
        checkOut:  string().regex(ISO_DATE_REGEX , 'Date must be a valid ISO date'),
        name: string().trim().min(1, {message: "Name is required."}),
        phone: string().trim().min(1, {message: "Phone is required."}),
        price: number().positive(),
    })
});

export type CreateBookingInput = TypeOf<typeof createBookingSchema>["body"];
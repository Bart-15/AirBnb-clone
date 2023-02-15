import { object, string, TypeOf } from "zod";

export const createBookingSchema = object({
    body: object({
        place: string().trim().min(1, {message: "User is required."}),
        user: string().trim().min(1, {message: "User is required."}),
        checkIn: string().datetime(),
        checkOut: string().datetime(),
        name: string().trim().min(1, {message: "Name is required."}),
        phone: string().trim().min(1, {message: "Phone is required"}),
        price: string().trim().min(1, {message: "Price is required."}),
    })
})

// export const createUserSchema = object({
//     body: object({
//         name: string().trim().min(1, {message: "Name is required."}),
//         email: string().trim().min(1, {message: "Email is required."}).email("This is not a valid email."),
//         password: string().min(6, "Password is too short - should be min 6 charactes")
//     })
// })

export type CreateBookingInput = TypeOf<typeof createBookingSchema>["body"]
import { object, string, TypeOf } from "zod";


export const createUserSchema = object({
    body: object({
        name: string().trim().min(1, {message: "Name is required."}),
        email: string().trim().min(1, {message: "Email is required."}).email("This is not a valid email."),
        password: string().min(6, "Password is too short - should be min 6 characters")
    })
})

export const loginUserSchema = object({
    body: object({
        email: string().trim().min(1, {message: "Email is required."}).email("This is not a valid email."),
        password: string().min(6, "Password is too short - should be min 6 characters")
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];

import * as z from "zod";

export const createUserSchema = z.object({
    body: z.object({
        username: z.string({
            required_error: "Please, provide a username."
        }).min(3, "Please, provide a username with at least 3 characters."),
        email: z.string({
            required_error: "Please, provide an email."
        }).email("Please, provide a valid e-mail."),
        password: z.string({
            required_error: "Please, provide a password."
        }).min(6, "Please, provide a password with at least 6 characters.")
    })
});

export const updateUserSchema = z.object({
    params: z.object({
        id:  z.string({
            required_error: "Please, provide a UUID."
        }).uuid("The identifier should be an UUID."),
    }),
    body: z.object({
        username: z.string({
            required_error: "Please, provide a username."
        }).min(3, "Please, provide a username with at least 3 characters."),
        email: z.string({
            required_error: "Please, provide an email."
        }).email("Please, provide a valid e-mail."),
        password: z.string({
            required_error: "Please, provide a password."
        }).min(6, "Please, provide a password with at least 6 characters.")
    })
});

export const getOneUserSchema = z.object({
    params: z.object({
        id:  z.string({
            required_error: "Please, provide a UUID."
        }).uuid("The identifier should be an UUID."),
    })
});

export const deleteUserSchema = z.object({
    params: z.object({
        id:  z.string({
            required_error: "Please, provide a UUID."
        }).uuid("The identifier should be an UUID."),
    })
});
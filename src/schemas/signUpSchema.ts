import {z} from 'zod';

//having just a single value
export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "No longer than 8 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username should not contain any special characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email address' }),
    password: z.string().min(6, {message: 'Password must be atleast 6 characters'})
})
import {z} from "zod"

export const acceptMessageSchema = z.object({
    aceptMessages: z.boolean(),
})


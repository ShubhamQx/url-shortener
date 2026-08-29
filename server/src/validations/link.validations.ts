import { z } from "zod";


export const createLinkValidator = z.object({
    fullLink:z.string().trim().pipe(z.url())
})

export type CreateLinkInputType = z.infer<typeof createLinkValidator>
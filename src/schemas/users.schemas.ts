import { z } from 'zod';
const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    admin: z.boolean().optional(),
    active: z.boolean(),
});
const requestUserSchema = userSchema.omit({
    id: true,
    active: true,
});
const responseUserSchema = userSchema.omit({ password: true });
const UpdateUserSchema = requestUserSchema.partial();
export { userSchema, requestUserSchema, UpdateUserSchema, responseUserSchema };

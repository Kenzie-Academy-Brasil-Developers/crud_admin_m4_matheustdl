import { z } from 'zod';
import {
    UpdateUserSchema,
    requestUserSchema,
    responseUserSchema,
    userSchema,
} from '../schemas/users.schemas';

type TUsers = z.infer<typeof userSchema>;

type TUserRequest = z.infer<typeof requestUserSchema>;

type TUserResponse = z.infer<typeof responseUserSchema>;

type TUserUpdateRequest = z.infer<typeof UpdateUserSchema>;

export { TUserRequest, TUsers, TUserResponse, TUserUpdateRequest };

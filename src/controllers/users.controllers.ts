import { Request, Response } from 'express';
import createUsersServices from '../services/users/createUsers.service';
import {
    TUserRequest,
    TUserResponse,
    TUserUpdateRequest,
} from '../interfaces/users.interfaces';
import listUsersServices from '../services/users/listUsers.service';
import { UpdateUserSchema, requestUserSchema } from '../schemas/users.schemas';
import listUserProfileService from '../services/users/listUsersProfile.service';
import deleteUsersService from '../services/users/deleteUser.service';
import { AppError } from '../error';
import updateUsersServices from '../services/users/updateUsers.service';
import recoverUsersServices from '../services/users/recoverUser.service';

const createUsersController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData: TUserRequest = requestUserSchema.parse(req.body);
    const newUser: TUserResponse = await createUsersServices(userData);
    return res.status(201).json(newUser);
};

const listUsersControllers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const users = await listUsersServices();
    return res.status(200).json(users);
};

const listUserProfileControllers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const user = await listUserProfileService(res.locals.id);
    return res.json(user);
};

const updateUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userId: number = parseInt(req.params.id);
    const userData: TUserUpdateRequest = UpdateUserSchema.parse(req.body);
    const updateUser = await updateUsersServices(userId, userData);
    return res.json(updateUser);
};
const deleteUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userId: number = parseInt(req.params.id);
    const isAdmin = res.locals.admin;
    if (isAdmin) {
        await deleteUsersService(userId);
        return res.status(204).send();
    }
    throw new AppError('Insufficient Permission', 403);
};

const recoverUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userId: number = parseInt(req.params.id);
    const updateUser = await recoverUsersServices();
    return res.json(updateUser);
};
export {
    createUsersController,
    listUsersControllers,
    listUserProfileControllers,
    updateUserController,
    deleteUserController,
    recoverUserController,
};

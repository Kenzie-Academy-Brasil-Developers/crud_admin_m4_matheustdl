import { Router } from 'express';
import {
    createUsersController,
    deleteUserController,
    listUserProfileControllers,
    listUsersControllers,
    recoverUserController,
    updateUserController,
} from '../controllers/users.controllers';
import ensureEmailNotExistsMiddleware from '../middlewares/ensureEmailNotExists.middleware';
import ensureTokenValidMiddleware from '../middlewares/ensureTokenValid.middleware';
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware';

const userRoutes: Router = Router();

userRoutes.post('', ensureEmailNotExistsMiddleware, createUsersController);
userRoutes.get('', ensureTokenValidMiddleware, listUsersControllers);
userRoutes.get(
    '/profile',
    ensureTokenValidMiddleware,
    listUserProfileControllers
);
userRoutes.patch('/:id', ensureUserExistsMiddleware, updateUserController);
userRoutes.delete('/:id', ensureTokenValidMiddleware, deleteUserController);
userRoutes.put('/:id/recover', recoverUserController);
export default userRoutes;

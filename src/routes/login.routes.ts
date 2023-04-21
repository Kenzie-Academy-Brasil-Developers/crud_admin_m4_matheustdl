import { Router } from 'express';
import { createSessionService } from '../services/login/createSession.service';
import createSessionController from '../controllers/login.controllers';

const loginRouter = Router();

loginRouter.post('', createSessionController);

export default loginRouter;

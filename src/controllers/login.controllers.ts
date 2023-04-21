import { Request, Response } from 'express';
import {
    TLoginRequest,
    TLoginResponse,
} from '../interfaces/session.interfaces';
import { createSessionService } from '../services/login/createSession.service';
import { requestLoginSchema } from '../schemas/login.schemas';

const createSessionController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData: TLoginRequest = requestLoginSchema.parse(req.body);
    const token: TLoginResponse = await createSessionService(userData);
    return res.status(200).json(token);
};
export default createSessionController;

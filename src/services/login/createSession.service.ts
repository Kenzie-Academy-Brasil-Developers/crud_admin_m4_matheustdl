import format from 'pg-format';
import {
    TLoginRequest,
    TLoginResponse,
} from '../../interfaces/session.interfaces';
import { QueryResult } from 'pg';
import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TUser } from '../../__tests__/mocks/interfaces';
import { client } from '../../database';
import { AppError } from '../../error';

const createSessionService = async (
    payload: TLoginRequest
): Promise<TLoginResponse> => {
    const query = `
    SELECT * FROM users WHERE email = %L
    `;
    const queryFormat: string = format(query, payload.email);
    const queryResult: QueryResult<TUser> = await client.query(queryFormat);
    const user = queryResult.rows[0];

    if (queryResult.rowCount === 0) {
        throw new AppError('Wrong email/password', 401);
    }

    const comparePassword: boolean = await bcrypt.compare(
        payload.password,
        user.password
    );

    if (comparePassword === false) {
        throw new AppError('Wrong email/password', 401);
    }

    const token: string = jwt.sign(
        {
            id: user.id,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '1d',
            subject: user.id.toString(),
        }
    );

    return { token };
};
export { createSessionService };

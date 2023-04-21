import { QueryResult } from 'pg';
import { TUserResponse } from '../../interfaces/users.interfaces';
import 'dotenv/config';
import { client } from '../../database';

const listUsersServices = async (): Promise<Array<TUserResponse>> => {
    const queryString: string = `
        SELECT
            "id",
            "name",
            "email",
            "admin",
            "active"
        FROM
            users;
    `;
    const queryResult: QueryResult<TUserResponse> = await client.query(
        queryString
    );

    return queryResult.rows;
};

export default listUsersServices;

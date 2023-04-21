import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';
import { TUserResponse } from '../../interfaces/users.interfaces';

const listUserProfileService = async (id: number): Promise<TUserResponse> => {
    const queryString: string = `
    SELECT
        "id",
        "name",
        "email",
        "admin",
        "active"
    FROM
        users
    WHERE
        id = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult: QueryResult<TUserResponse> = await client.query(
        queryConfig
    );
    return queryResult.rows[0];
};
export default listUserProfileService;

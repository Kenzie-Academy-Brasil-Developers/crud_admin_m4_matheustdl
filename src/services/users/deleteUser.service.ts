import { QueryConfig, QueryResult } from 'pg';
import { TUserResponse } from '../../interfaces/users.interfaces';
import { client } from '../../database';

const deleteUsersService = async (userId: number): Promise<TUserResponse> => {
    const queryString: string = `
    DELETE FROM
      users
    WHERE
      id = $1
  `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId],
    };
    const queryResult: QueryResult<TUserResponse> = await client.query(
        queryConfig
    );
    return queryResult.rows[0];
};
export default deleteUsersService;

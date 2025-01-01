import { createPool } from 'mysql2'
import { DatabasePassword } from './Passwords.js'

export const pool = createPool({
    host: 'localhost',
    user: "root",
    password: DatabasePassword,
    database: "studysnap",
}).promise()

export async function QueryUserByEmail(email) {
    const result = await pool.query(`SELECT * FROM user WHERE email = $1`, [email]);
    return result.rows[0];
}

export async function IsUsernameOrEmailTaken(username, email) {
    const result = await pool.query(
        `SELECT * FROM user WHERE username = $1 OR email = $2`,
        [username, email]
    );
    return result.rows.length > 0;
}

/*This is a place for queries
 * get user 
get users subjects, saved sections
get subjects setions
get sections notes
get likes
get saves
get sections
 * 
*/
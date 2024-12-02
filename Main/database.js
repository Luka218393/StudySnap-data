import { createPool } from 'mysql2'
import { DatabasePassword } from './Passwords.js'

export const pool = createPool({
    host: 'localhost',
    user: "root",
    password: DatabasePassword,
    database: "studysnap",
}).promise()

pool.query(`SELECT * FROM user;`)


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
import { createPool } from 'mysql2'
import { DatabasePassword } from './Passwords.js'

export const pool = createPool({
    host: 'localhost',
    user: "root",
    password: DatabasePassword,
    database: "studysnap",
})

var result = []
pool.query(`
    SELECT * FROM user;
    `,(err, res) => {console.log(err); console.log(res)}
)

/*This is a place for queries*/ 
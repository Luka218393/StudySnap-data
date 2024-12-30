import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "./Models"
import {QueryUserByEmail, IsUsernameOrEmailTaken} from "./database"


const PORT = 8080
const app = express()
app.use(express.json())


let activeTokens = [];
let users = [
    {
        "name": "name1",
        "email": "email1",
        "password": "password1"
    },
    {
        "name": "name2",
        "email": "email2",
        "password": "password2"
    },
    {
        "name": "name3",
        "email": "email3",
        "password": "password3"
    }
]

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token)
        jwt.verify(token, 'SecretKey', (err, user) => {
            if (err) {
                return res.status(403).json(`Token is not valid ${token}`);
            }
            else {
                req.user = user;
                next();
            }
        });
    }
    else {
        res.status(401).json('You are not authenticated');
    }
};

// Refresh token
app.post('/refresh-token', verify, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'SecretKey');
    } catch (err) {
        return res.status(401).json('Invalid token');
    }

    const newToken = jwt.sign({ id: decodedToken.id }, 'SecretKey', { expiresIn: '15m' });
    activeTokens = activeTokens.filter(element => element != token);
    activeTokens.push(newToken);
    res.json({ id: decodedToken.id, newToken });
});

// Log in token
app.post('/log-in', async (req, res) => {
    const { email, password } = req.body;
    const user = QueryUserByEmail(email) // This should be a query to the database
    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const newToken = jwt.sign({ id: user.id }, 'SecretKey', { expiresIn: '15m' });
            activeTokens.push(newToken);
            res.json({ email: user.email, newToken });
        } else {
            res.status(401).json('Invalid password');
        }
    } else {
        res.status(401).json('Invalid email');
    }
});

app.post('/sign-up', (req, res) => {
    const { username, full_name, email, password } = req.body;
    if (!username || !full_name || !email || !password) {
        return res.status(400).send("Insufficient data provided");
    }
    const user = new User ( username, full_name, email, password,)
    if (IsUsernameOrEmailTaken(username) ){
        res.status(409).send("Username or email is already taken")
        return
    }
    try{
        user.Insert()
        res.status(201).send()
    }catch(err){
        res.status(501)
    }
});


app.listen(
    PORT,
    () => { console.log(`App started on port ${PORT}`) }
)

/*
app.post("/completion", (req, res) => {}

app.post("/completionWithContext", (req, res) => {}

app.post("/imageNote", (req, res) => {}

app.post("/quizz", (req, res) => {}

    app.post("/refresh-token", (req, res) => {

app.post("/log-in", (req, res) => {
+JWT - mora expierat
    */


/*
app.get("/login")

app.get("/home")

app.get("subject/:id")

app.get("/discover")*/

/*
app.get(`/user`, (req, res) => {
    res.status(200).send({
        1: "Pokemoni",
        2: "Pokemoni 2"
    })
})

app.post("/user/:id", (req, res) => {
    const { id } = req.params
    const { logo } = req.body

    if (!logo) {
        res.status(418).send({ Message: "We need a logo 20000" })
    }
    res.send({
        eo: `theese are your ${id}, ${logo}`
    })
})
*/

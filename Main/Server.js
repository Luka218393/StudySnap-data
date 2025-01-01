import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "./Models.js"
import {QueryUserByEmail, IsUsernameOrEmailTaken} from "./database.js"

const PORT = 8080
const app = express()
app.use(express.json())


let activeTokens = [];


const scheduleTokenRemoval = (token, expiresIn) => {
    setTimeout(() => {
        activeTokens = activeTokens.filter(t => t !== token);
    }, expiresIn * 1000);
};

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
    activeTokens = activeTokens.filter(element => element !== token);
    activeTokens.push(newToken);
    scheduleTokenRemoval(newToken, 15 * 60); 

    res.json({ newToken });
});

// Log in token
/* You need to provide email and original (not hashed) password) */
app.post('/log-in', async (req, res) => {
    const { email, password } = req.body;
    const user = await QueryUserByEmail(email)
    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const newToken = jwt.sign({ id: user.id }, 'SecretKey', { expiresIn: '15m' });
            activeTokens.push(newToken);
            scheduleTokenRemoval(newToken, 15 * 60); // Schedule removal of the new token after 15 minutes
            res.json({ newToken });
        } else {
            res.status(401).json('Invalid password');
        }
    } else {
        res.status(401).json('Invalid email');
    }
});

app.post('/sign-up', async (req, res) => {
    const { username, full_name, email, password } = req.body;
    if (!username || !full_name || !email || !password) {
        return res.status(400).send("Insufficient data provided");
    }
    const user = new User ( username, full_name, email, password,)
    if (await IsUsernameOrEmailTaken(username) ){
        res.status(409).send("Username or email is already taken")
        return
    }
    try{
        await user.Insert()
        res.status(201).send()
    }catch(err){
        res.status(501)
    }
});


app.listen(
    PORT,
    () => { console.log(`App started on port ${PORT}`) }
)


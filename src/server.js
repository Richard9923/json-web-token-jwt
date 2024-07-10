require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verifyu } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const {createAcessToken, createRefreshToken } = require('./tokens.js')

const { fakeDB } = require('./fakeDB.js');


// 1. Register a user
// 2. Login a user
// 3. Logout a user
// 4. Setup a proptected route
// 5. Get a new accesstoken with a refresh token

const server = express();

// Use express middleware for easier cookie handling
server.use(cookieParser());
server.use(
    cors({
        orgin: 'http://localhost:8000',
        credentials: true
    })
);

// Needed to be able to read body data
server.use(express.json()); // to support JSON-encoded bodies
server.use(express.urlencoded({extended: true})); // Support URL-encoded bodies


// 1. Register a user 
server.post('/register', async (req, res) => {
    const { email, password} = req.body; 

    try {
        // 1. Check if user exist
        
        const user = fakeDB.find(user => user.email === email);
        if (user) throw new Error("User already exist");
        // 2 if not user exist, hash the password

        const hashedPassword = await hash(password, 10);
        console.log(hashedPassword);
        // 3. Insert the user in "database"
        fakeDB.push({
            id: fakeDB.length,
            email,
            password: hashedPassword
        })

        res.send({message: 'User Created' });
        console.log(fakeDB);
    } catch(err) {
        res.send({
            error: `${err.message}`,
        })
    }
})

// 2. Login a user
server.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        
        // 1. Find user in database. If not exist send error
        const user = fakeDB.find(user => user.email === email);
        if (!user) throw new Error("User does not exist");
        // 2 Compare crypted password and see if it checks out. Send error if not
        const valid = await compare(password, user.password);
        if (!valid) throw new Error("Password not correct");
        // 3. Create Refrsh and Accesstoken
        const accesstoken = createAcessToken(user.id);
        const refreshtoken = createRefreshToken(user.id);


    } catch (err) {
        
    }
})

server.listen(process.env.PORT, () => {
    console.log(`Server listening on PORT: ${process.env.PORT}`)
})

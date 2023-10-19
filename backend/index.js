const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv'); 
const MD5 = require("crypto-js/md5");

const app = express()

dotenv.config()

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', (req, res) => {
    res.send('Hello from express');
});

app.post('/backend/login', (req, res) => {
    let nick = req.body.user_nick
    let password = req.body.user_password
    let hashed_password = MD5(password).toString()

    let conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "chat-project"
    })

    conn.connect( (err) => {
        if(err)
            throw err
        let query = `select * from users where user_nick='${nick}' and user_password='${hashed_password}'`
        conn.query(query, (err, result, fields) => {
            if(err)
                throw err
            let token = null;
            if(result.length){
                let jwtSecretKey = process.env.JWT_SECRET_KEY; 
                let algorithm = process.env.ALGORITHM
                token = jwt.sign(
                    {
                        "nick": nick,
                        "password": password
                    },
                    jwtSecretKey,
                    {
                    "algorithm": algorithm
                    }
                )
                return res.status(200).send(JSON.stringify(
                    {
                        status: "LOGGED",
                        jwt: token
                    }
                ))
            }
            else{
                return res.status(404).send(JSON.stringify(
                    {
                        status: "NOT_LOGGED",
                        jwt: token
                    }
                ))   
            }
            
            
        })
    })

});

app.post('/backend/getUsers', (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let token = req.body.jwt
    
    
    jwt.verify(token, jwtSecretKey, function(err, decoded) {
        if(err){
            return res.status(404).send(JSON.stringify(
                {
                    status: "TOKEN_EXPIRED"
                }
                ))
        }

        let nick = decoded.nick

        let conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "chat-project"
        })

        conn.connect( (err) => {
            if(err)
                throw err
            let query = `select * from users where user_nick!='${nick}'`
            conn.query(query, (err, result, fields) => {
                if(err)
                    throw err
                let usersList = []
                for(let user of result){
                    usersList.push({"user_id": user.user_id, "user_nick": user.user_nick})
                }
                return res.status(200).send(JSON.stringify(
                    {
                        status: "OK",
                        users: usersList
                    }
                ))
            })
        })
    });



});

const port = process.env.PORT;

app.listen(port, () => console.log(`App listening on PORT ${port}`));
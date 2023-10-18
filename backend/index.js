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
console.log(process.env.JWT_SECRET_KEY)

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


const port = process.env.PORT;

app.listen(port, () => console.log(`App listening on PORT ${port}`));
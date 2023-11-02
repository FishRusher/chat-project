const MD5 = require("crypto-js/md5");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
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
        if(err){
            conn.end();
            return res.status(500).send(JSON.stringify(
                {
                    status: "ERROR"
                }
            ))
        }
        
        let query = `select user_id from users where user_nick='${nick}' and user_password='${hashed_password}'`
        conn.query(query, (err, result, fields) => {
            if(err){
                conn.end();
                return res.status(500).send(JSON.stringify(
                    {
                        status: "ERROR"
                    }
                ))
            }
            let token = null;
            if(result.length == 1){

                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                let algorithm = process.env.ALGORITHM;
                token = jwt.sign(
                    {
                        "id": result[0].user_id,
                        "nick": nick,
                        "password": password,
                    },
                    jwtSecretKey,
                    {
                        "algorithm": algorithm,
                        "expiresIn": "10d"
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
                return res.status(401).send(JSON.stringify(
                    {
                        status: "NOT_LOGGED",
                        jwt: token
                    }
                ))   
            }
            
            
        })
    })

}
module.exports = { login }
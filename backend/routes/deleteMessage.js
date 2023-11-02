const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv'); 
const MD5 = require("crypto-js/md5");

const deleteMessage = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let token = req.body.jwt
    let message_id = req.body.message_id
    
    try {
        var decoded = jwt.verify(token, jwtSecretKey);
    } catch(err) {
        return res.status(401).send(JSON.stringify(
            {
                status: "TOKEN_EXPIRED"
            }
        ))
    }

    let conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: process.env.DATABASE_NAME
    })

    conn.connect( (err) => {
        if(err)
            throw err
        let query_start = `select * from users where user_nick='${decoded.nick}' and user_password='${MD5(decoded.password).toString()}'`
        conn.query(query_start, (err, result) => {
            if (err || !result.length) {
                conn.end();
                return res.status(404).send(JSON.stringify(
                    {
                        status: "INVALID_LOGIN"
                    }
                ))
            }
            let query = `delete from chatroom_message where message_id='${message_id}'`
            conn.query(query, (err, result, fields) => {
                if(err){
                    return res.status(404).send(JSON.stringify(
                        {
                            status: "INVALID_MESSAGE"
                        }
                    ))
                }
                if(result){
                    return res.status(200).send(JSON.stringify(
                        {
                            status: "OK"
                        }
                    ))
                }
                else{
                    return res.status(500).send(JSON.stringify(
                        {
                            status: "ERROR"
                        }
                    ))
                }
            })
        })
    })

}
module.exports = { deleteMessage }
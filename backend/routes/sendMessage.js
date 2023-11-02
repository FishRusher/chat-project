const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const MD5 = require("crypto-js/md5");

const sendMessage = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let token = req.body.jwt
    let message = req.body.message
    let receiver_id = req.body.receiver_id
    let decoded;
    try {
        decoded = jwt.verify(token, jwtSecretKey, {algorithms: [process.env.ALGORITHM]});
    } catch (err) {
        console.log(err)
        return res.status(401).send(JSON.stringify(
            {
                status: "TOKEN_EXPIRED"
            }
        ))
    }

    let sender_id = decoded.id

    let conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: process.env.DATABASE_NAME
    })

    conn.connect((err) => {
        if (err)
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
            let query = `insert into chatroom_message(message_id, sender_id, receiver_id, message_content) values ('', ${sender_id}, ${receiver_id}, '${message}')`
            conn.query(query, (err, result, fields) => {
                if (err) {
                    return res.status(500).send(JSON.stringify(
                        {
                            status: "ERROR",
                        }))
                }
                return res.status(200).send(JSON.stringify(
                    {
                        status: "OK",
                    }))
            })
        })
    })
}
module.exports = { sendMessage }
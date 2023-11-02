const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const MD5 = require("crypto-js/md5");

const forwardMessage = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let token = req.body.jwt
    let message_id = req.body.message_id
    let receiver_ids = req.body.forward_to
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

            let query = `select * from chatroom_message where message_id='${message_id}'`
            conn.query(query, (err, result, fields) => {
                if (err) {
                    conn.end()
                    return res.status(500).send(JSON.stringify(
                        {
                            status: "ERROR",
                        }))
                }
                if(result){
                    let query2 = `insert into forwarded_message(message_id, sender_id, receiver_id) values `
                    for(let receiver_id of receiver_ids){
                        query2 += `(${message_id}, ${sender_id}, ${receiver_id}),`
                    }
                    query2 = query2.slice(0, -1)
                    conn.query(query2, (err, result) => {
                        if (err) {
                            conn.end()
                            return res.status(500).send(JSON.stringify(
                                {
                                    status: "ERROR",
                                }))
                        }
                        if(result){
                            conn.end()
                            return res.status(200).send(JSON.stringify(
                                {
                                    status: "OK",
                                }))
                        }
                    })
                }
                else{
                    conn.end()
                    return res.status(404).send(JSON.stringify(
                        {
                            status: "INVALID_MESSAGE",
                        }))
                }
            })
        })
    })
}
module.exports = { forwardMessage }
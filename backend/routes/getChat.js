const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const getChat = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let token = req.body.jwt
    let receiver_id = req.body.receiver_id

    try {
        var decoded = jwt.verify(token, jwtSecretKey);
    } catch (err) {
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
        database: "chat-project"
    })

    conn.connect((err) => {
        if (err)
            throw err

        let messageList = []

        let query = `select * from chatroom_message where receiver_id='${receiver_id}' and sender_id='${sender_id}'`
        conn.query(query, (err, result, fields) => {
            if (err) {
                conn.end();
                return res.status(401).send(JSON.stringify(
                    {
                        status: "INVALID_USER"
                    }
                ))
            }
            for (let message of result) {
                messageList.push({
                    message_id: message.message_id,
                    incoming: false,
                    message_content: message.message_content,
                    message_date: message.message_date
                })
            }

            let query2 = `select * from chatroom_message where receiver_id='${sender_id}' and sender_id='${receiver_id}'`
            conn.query(query2, (err, result, fields) => {
                if (err) {
                    conn.end();
                    return res.status(401).send(JSON.stringify(
                        {
                            status: "INVALID_USER"
                        }
                    ))
                }
                for (let message of result) {
                    messageList.push({
                        message_id: message.message_id,
                        incoming: true,
                        message_content: message.message_content,
                        message_date: message.message_date
                    })
                }

                let receiver_nick = ""

                let query3 = `select user_nick from users where user_id='${receiver_id}'`
                conn.query(query3, (err, result, fields) => {
                    if (err) {
                        conn.end();
                        return res.status(401).send(JSON.stringify(
                            {
                                status: "INVALID_USER"
                            }
                        ))
                    }
                    if (result.length) {
                        receiver_nick = result[0].user_nick
                    }

                    messageList.sort(function (a, b) {
                        return new Date(a.message_date) - new Date(b.message_date);
                    });

                    conn.end();
                    return res.status(200).send(JSON.stringify(
                        {
                            status: "OK",
                            receiver_nick: receiver_nick,
                            messages: messageList
                        }
                    ))
                })

            })
        })
    })
}
module.exports = { getChat }
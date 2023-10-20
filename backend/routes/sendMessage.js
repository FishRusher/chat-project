const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const sendMessage = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let token = req.body.jwt
    let message = req.body.message
    let receiver_id = req.body.receiver_id
    let decoded;
    try {
        decoded = jwt.verify(token, jwtSecretKey);
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
        database: "chat-project"
    })

    conn.connect((err) => {
        if (err)
            throw err
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
}
module.exports = { sendMessage }
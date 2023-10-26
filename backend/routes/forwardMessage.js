const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const forwardMessage = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let token = req.body.jwt
    let message_id = req.body.message_id
    let receiver_ids = req.body.forward_to
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
        
        let query = `select * from chatroom_message where message_id='${message_id}'`
        conn.query(query2, (err, result, fields) => {
            if (err) {
                conn.end()
                return res.status(500).send(JSON.stringify(
                    {
                        status: "ERROR",
                    }))
            }
            if(result){
                for(let receiver_id of receiver_ids){
                    let query2 = `insert into forwarded_message(message_id, sender_id, receiver_id) values (${message_id}, ${sender_id}, ${receiver_id})`
                    conn.query(query2, (err) => {
                        if (err) {
                            conn.end()
                            return res.status(500).send(JSON.stringify(
                                {
                                    status: "ERROR",
                                }))
                        }
                    })
                }
                conn.end()
                return res.status(200).send(JSON.stringify(
                    {
                        status: "OK",
                    }))
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
}
module.exports = { forwardMessage }
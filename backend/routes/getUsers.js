const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv'); 

const getUsers = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let token = req.body.jwt
    
    try {
        var decoded = jwt.verify(token, jwtSecretKey);
    } catch(err) {
        return res.status(401).send(JSON.stringify(
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

}
module.exports = { getUsers }
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const MD5 = require("crypto-js/md5");

const getNick = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let token = req.body.jwt

    try {
        var decoded = jwt.verify(token, jwtSecretKey, {algorithms: [process.env.ALGORITHM]});
    } catch (err) {
        return res.status(401).send(JSON.stringify(
            {
                status: "TOKEN_EXPIRED"
            }
        ))
    }

    let id = decoded.id

    let conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: process.env.DATABASE_NAME
    })

    conn.connect((err) => {
        if(err){
            conn.end();
            return res.status(500).send(JSON.stringify(
                {
                    status: "ERROR"
                }
            ))
        }

        let query_start = `select * from users where user_nick='${decoded.nick}' and user_password='${MD5(decoded.password).toString()}'`
        conn.query(query_start, (err, result) => {
            if(err){
                conn.end();
                return res.status(500).send(JSON.stringify(
                    {
                        status: "ERROR"
                    }
                ))
            }
            if (!result.length) {
                conn.end();
                return res.status(401).send(JSON.stringify(
                    {
                        status: "INVALID_LOGIN"
                    }
                ))
            }
            let query = `select user_nick from users where user_id='${id}'`
            conn.query(query, (err, result, fields) => {
                if(err){
                    conn.end();
                    return res.status(500).send(JSON.stringify(
                        {
                            status: "ERROR"
                        }
                    ))
                }

                if (result.length !== 1) {
                    conn.end()
                    return res.status(500).send(JSON.stringify(
                        {
                            status: "ERROR"
                        }
                    ))
                }

                conn.end()

                return res.status(200).send(JSON.stringify(
                    {
                        status: "OK",
                        nick: result[0].user_nick
                    }
                ))
            })
        })


    })

}
module.exports = { getNick }
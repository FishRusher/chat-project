const MD5 = require("crypto-js/md5");
const mysql = require("mysql");

const register = (req, res) => {
    let nick = req.body.user_nick
    let password = req.body.user_password
    let hashed_password = MD5(password).toString()


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
        
        let query = `select * from users where user_nick='${nick}'`
        conn.query(query, (err, result, fields) => {
            if (err)
                throw err
            if (result.length !== 0) {
                return res.status(409).send(JSON.stringify(
                    {
                        status: "USER_EXISTS",
                    }))
            }
            else {
                query = `insert into users values('', '${nick}', '${hashed_password}')`
                conn.query(query, (error, result, fields) => {
                    if (error) return res.status(500).send(JSON.stringify(
                        {
                            status: "ERROR",
                        }
                    ))
                })
                return res.status(200).send(JSON.stringify(
                    {
                        status: "REGISTERED",
                    }
                ))
            }
        })
    })
}
module.exports = { register }
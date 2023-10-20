const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const MD5 = require("crypto-js/md5");
const cors = require("cors");
const { login } = require("./routes/login");
const { getUsers } = require("./routes/getUsers");
const { register } = require("./routes/register");
const { sendMessage } = require("./routes/sendMessage");

const app = express()

dotenv.config()

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello from express');
});

app.post('/backend/login', login);

app.post('/backend/getUsers', getUsers);

app.post('/backend/register', register);

app.post('/backend/sendMessage', sendMessage);

const port = process.env.PORT;

app.listen(port, () => console.log(`App listening on PORT ${port}`));
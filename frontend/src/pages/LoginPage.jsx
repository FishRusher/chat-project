import React, { useRef } from 'react'
import { Box, Button, Paper, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

const LoginPage = () => {
    let nick = useRef(null)
    let pass = useRef(null)
    let navigate = useNavigate()

    function login() {
        if (nick.current === null) return
        if (pass.current === null) return
        let n = nick.current.value
        let p = pass.current.value
        if (n === "" || n === undefined) return
        if (p === "" || p === undefined) return
        let data = {}
        data["user_nick"] = n
        data["user_password"] = p

        fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                try {
                    if (response["status"] === "LOGGED") {
                        localStorage.setItem("jwt", response["jwt"])
                        navigate("/")
                    }
                    else {
                        alert("Niepoprawne dane logowania")
                    }
                }
                catch (e) {
                    alert("Błąd danych")
                }
            })
            .catch(error => {
                alert("Błąd")
            })
    }

    localStorage.removeItem("jwt")

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
            <Paper elevation={5} sx={{ p: 5 }}>
                <Box sx={{ textAlign: "Center", m: 2, fontSize: 30 }}>Logowanie</Box>
                <Box sx={{ m: 2 }}>
                    <TextField label="Nick" inputRef={nick}></TextField>
                </Box>
                <Box sx={{ m: 2 }}>
                    <TextField label="Hasło" inputRef={pass} type='password'></TextField>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Button variant='contained' onClick={login}>Zaloguj</Button>
                </Box>

                <Box sx={{ marginTop: 2 }}>Nie masz konta? <Link to="/register">Zarejestruj się</Link></Box>
            </Paper>
        </Box>
    )
}

export default LoginPage
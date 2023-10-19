import React, { useRef } from 'react'
import { Box, TextField, Paper, Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"


const RegisterPage = () => {
    let nick = useRef(null)
    let pass1 = useRef(null)
    let pass2 = useRef(null)
    const navigate = useNavigate()

    function register() {
        if (nick.current === null) return
        if (pass1.current === null) return
        if (pass2.current === null) return
        let n = nick.current.value
        let p1 = pass1.current.value
        let p2 = pass2.current.value
        if (n === "" || n === undefined) return
        if (p1 === "" || p1 === undefined) return
        if (p2 === "" || p2 === undefined) return
        if (p1 !== p2) return
        let data = new FormData()
        data.append("user_nick", n)
        data.append("user_password", p1)


        fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/register`, {
            method: "POST",
            body: data
        }).then(response => response.json())
            .then(response => {
                try {
                    if (response["status"] === "REGISTERED") {
                        navigate("/login")
                    }
                    else {
                        alert("BŁAD REJESTRACJI")
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

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
            <Paper elevation={5} sx={{ p: 5 }}>
                <Box sx={{ textAlign: "Center", m: 2, fontSize: 30 }}>Rejestracja</Box>
                <Box sx={{ m: 2 }}>
                    <TextField label="Nick" inputRef={nick}></TextField>
                </Box>
                <Box sx={{ m: 2 }}>
                    <TextField label="Hasło" inputRef={pass1} type='password'></TextField>
                </Box>
                <Box sx={{ m: 2 }}>
                    <TextField label="Powtórz hasło" inputRef={pass2} type='password'></TextField>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Button variant='contained' onClick={register}>Utwórz konto</Button>
                </Box>

                <Box sx={{ marginTop: 2 }}>Masz już konto? <Link to="/login">Zaloguj się</Link></Box>
            </Paper>
        </Box>
    )
}

export default RegisterPage
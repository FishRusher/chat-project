import React, { useRef, useState } from 'react'
import { Box, Button, Paper, TextField } from "@mui/material"
import {useNavigate} from "react-router-dom"

const LoginPage = () => {
  let nick = useState("")
  let pass = useRef("")
  let navigate = useNavigate()

  function login() {
    if (nick.current === null) return
    if (pass.current === null) return
    let n = nick.current
    let p = pass.current
    console.log(n)
    console.log(p)
    if (n === "" || n === undefined) return
    if (p === "" || p === undefined) return


    let data = new FormData()
    data.append("user_nick", n)
    data.append("user_password", p)

    fetch(`${import.meta.env.BACKEND_ADDRESS}/login`, {
      method: "POST",
      body: data
    }).then(response => response.json())
    .then(response => {
      if (response["status"] === "LOGGED") {
        localStorage.setItem("jwt", response["jwt"])
        navigate("/")
      }
      else {
        // to ADD
      }
    })

  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
      <Paper elevation={5} sx={{ p: 5 }}>
        <Box sx={{ textAlign: "Center", m: 2, fontSize: 30 }}>Logowanie</Box>
        <Box sx={{ m: 2 }}>
          <TextField label="Nick" ref={nick}></TextField>
        </Box>
        <Box sx={{ m: 2 }}>
          <TextField label="Hasło" ref={pass} type='password'></TextField>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button variant='contained' onClick={login}>Zaloguj</Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginPage
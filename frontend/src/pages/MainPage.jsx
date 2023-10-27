import { Box, Button, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UsersList from '../components/UsersList'
import { Logout } from '@mui/icons-material'

const MainPage = () => {
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [nick, setNick] = useState("???")

    useEffect(() => {
        if (localStorage.getItem("jwt") === null) {
            navigate("login")
        }
        else {
            const data = {jwt: localStorage.getItem("jwt")}

            fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/getNick`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(response => {
                    if (response.status === "TOKEN_EXPIRED") {
                        localStorage.removeItem("jwt")
                        navigate("/login")
                    }
                    if (response.status === "OK") {
                        setNick(response.nick)
                    }
                })
                .catch(e => {
                    alert("Błąd")
                })
        }
    }, [])

    function logOut() {
        localStorage.removeItem("jwt")
        navigate("/login")
    }

    useEffect(() => {
        function getUsers() {
            const jwt = localStorage.getItem("jwt")
            const data = {}
            data["jwt"] = jwt

            fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/getUsers`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(response => {
                    if (response.status === "TOKEN_EXPIRED") {
                        localStorage.removeItem("jwt")
                        navigate("/login")
                    }
                    setUsers(response.users)
                })
                .catch(e => {

                })
        }

        getUsers()
    }, [])

    return (
        <Box sx={{ display: "flex", height: "100%", gap: 2, p: 2 }}>
            <Box sx={{ height: "100%", flexGrow: 1, flexBasis: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                <Paper elevation={7} sx={{ flexGrow: 1, flexBasis: 0, overflow: "hidden" }}>
                    <UsersList users={users}></UsersList>
                </Paper>
                <Paper elevation={7} sx={{ p: 2, display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                    <Box sx={{fontWeight: 900, fontSize: 25}}>{nick}</Box>
                    <Button variant='contained' color='error' endIcon={<Logout/>} onClick={logOut}>Wyloguj</Button>
                </Paper>
            </Box>

            <Paper elevation={7} sx={{ height: "100%", flexGrow: 3, flexBasis: 0 }}>
                <Outlet context={users}></Outlet>
            </Paper>
        </Box>
    )
}

export default MainPage
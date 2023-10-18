import { Box, Button, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UsersList from '../components/UsersList'
import { Logout } from '@mui/icons-material'

const MainPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("jwt") === null) {
            navigate("login")
        }
    }, [])

    function logOut() {
        localStorage.removeItem("jwt")
        navigate("/login")
    }

    return (
        <Box sx={{ display: "flex", height: "100%", gap: 2, p: 2 }}>
            <Box sx={{ height: "100%", flexGrow: 1, flexBasis: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                <Paper elevation={7} sx={{ flexGrow: 1, flexBasis: 0, overflow: "hidden" }}>
                    <UsersList></UsersList>
                </Paper>
                <Paper elevation={7} sx={{ p: 2 }}>
                    <Button variant='contained' color='error' endIcon={<Logout/>} onClick={logOut}>Wyloguj</Button>
                </Paper>
            </Box>

            <Paper elevation={7} sx={{ height: "100%", flexGrow: 3, flexBasis: 0 }}>
                <Outlet></Outlet>
            </Paper>
        </Box>
    )
}

export default MainPage
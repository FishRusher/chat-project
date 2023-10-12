import { Box, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UsersList from '../components/UsersList'

const MainPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("jwt") === null) {
            navigate("login")
        }
    }, [])

    return (
        <Box sx={{ display: "flex", height: "100%", gap: 2, p: 2 }}>
            <Box sx={{ height: "100%", flexGrow: 1, flexBasis: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                <Paper elevation={5} sx={{ flexGrow: 1, flexBasis: 0, overflow: "hidden" }}>
                    <UsersList></UsersList>
                </Paper>
                <Paper elevation={5} sx={{ p: 2 }}>
                    coś
                </Paper>
            </Box>

            <Paper elevation={5} sx={{ height: "100%", flexGrow: 3, flexBasis: 0 }}></Paper>
        </Box>
    )
}

export default MainPage
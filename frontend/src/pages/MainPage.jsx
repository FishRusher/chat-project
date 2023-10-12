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
            <Paper elevation={5} sx={{ height: "100%", flexGrow: 1, flexBasis: 0 }}>
                <Box>
                    <UsersList></UsersList>
                </Box>
                <Box></Box>
            </Paper>
            <Paper elevation={5} sx={{ height: "100%", flexGrow: 3, flexBasis: 0 }}></Paper>
        </Box>
    )
}

export default MainPage
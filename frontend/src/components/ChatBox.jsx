import React from 'react'
import { Avatar, Box, Paper } from "@mui/material"
import { useParams } from "react-router-dom"

const ChatBox = () => {
    const { user_id } = useParams()

    function getChat() {

    }

    return (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
            <Paper elevation={1} sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                <Avatar></Avatar>
                <Box sx={{ fontWeight: 900, fontSize: 30 }}>Nickname</Box>
            </Paper>
            <Paper elevation={1} sx={{ p: 2, gap: 2, flexGrow: 1, display: "block" }}>

            </Paper>
        </Box>
    )
}

export default ChatBox
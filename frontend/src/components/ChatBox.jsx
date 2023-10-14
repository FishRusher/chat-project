import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Paper, TextField } from "@mui/material"
import { useParams } from "react-router-dom"

import ChatMessage from './ChatMessage'
import { Send } from '@mui/icons-material'

const ChatBox = () => {
    const { user_id } = useParams()
    const [chat, setChat] = useState([])

    function getChat() {

        // DB CONNECTION

        setChat([
            { message_id: 1, incoming: true, message_content: "    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum ipsa accusamus vero tempore velit similique dignissimos dicta rerum modi quaerat minima impedit vitae illo commodi inventore voluptate officia sunt pariatur ab incidunt et, laudantium itaque? Hic perspiciatis possimus inventore corrupti laborum reiciendis ut nisi iure ad, ab doloremque neque non sit unde aut porro aperiam? Neque eius ex hic itaque, quae ad ratione distinctio voluptatem modi, eum incidunt nemo corrupti blanditiis. Fugit, nam nihil? Quia odio reiciendis nulla sed ipsum deleniti, omnis cum dicta dolorem, laboriosam magnam beatae, non quod inventore libero alias delectus culpa earum. Architecto unde sint cum.", message_date: new Date() },
            { message_id: 2, incoming: true, message_content: "coś", message_date: new Date() },
            { message_id: 3, incoming: false, message_content: "coś Lorem, ipsum dolor sit amet consectetur", message_date: new Date() },
            { message_id: 4, incoming: true, message_content: "coś", message_date: new Date() },
            { message_id: 5, incoming: true, message_content: "coś", message_date: new Date() },
            // { message_id: 6, incoming: true, message_content: "coś", message_date: new Date() },
            // { message_id: 3, incoming: false, message_content: "coś Lorem, ipsum dolor sit amet consectetur", message_date: new Date() },
            // { message_id: 4, incoming: true, message_content: "coś", message_date: new Date() },
            // { message_id: 5, incoming: true, message_content: "coś", message_date: new Date() },
            // { message_id: 6, incoming: true, message_content: "coś", message_date: new Date() },
            // { message_id: 3, incoming: false, message_content: "coś Lorem, ipsum dolor sit amet consectetur", message_date: new Date() },
            // { message_id: 4, incoming: true, message_content: "coś", message_date: new Date() },
            // { message_id: 5, incoming: true, message_content: "coś", message_date: new Date() },
            // { message_id: 6, incoming: true, message_content: "coś", message_date: new Date() },
        ])

    }

    useEffect(() => {
        getChat()
    }, [])

    return (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
            <Paper elevation={2} sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 2, border: 1 }}>
                <Avatar></Avatar>
                <Box sx={{ fontWeight: 900, fontSize: 30 }}>Nickname</Box>
            </Paper>
            <Box sx={{ p: 2, gap: 2, flexGrow: 1, display: "flex", overflow: "hidden", flexDirection: "column" }}>
                <Box sx={{ flexGrow: 1, flexBasis: 0, overflow: "scroll" }}>
                    {chat.map(m => <ChatMessage key={m.message_id} message={m}></ChatMessage>)}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField maxRows={2} multiline fullWidth InputProps={{ sx: { borderRadius: 100 } }} placeholder='Napisz wiadomość...'></TextField>
                    <Button variant='contained' sx={{ p: 2, m: 1, borderRadius: 100 }}><Send fontSize='large' sx={{ color: "white" }}></Send></Button>
                </Box>
            </Box>
        </Box >
    )
}

export default ChatBox
import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, Paper, TextField } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { randomColor, getInitials } from '../functions'
import ChatMessage from './ChatMessage'
import { Send } from '@mui/icons-material'

const ChatBox = () => {
    const receiver_id = useParams()["user_id"]
    const [chat, setChat] = useState([])
    const [receiverNick, setReceiverNick] = useState("???")
    const navigate = useNavigate()

    const messageInput = useRef(null)

    function sendMessage() {
        if (messageInput.current === null) return
        const message = messageInput.current.value
        if (message === "" || message === null) return

        const jwt = localStorage.getItem("jwt")
        const data = new FormData()

        data.append("jwt", jwt)
        data.append("message", message)
        data.append("receiver_id", receiver_id)

        fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/sendMessage`, {
            method: "POST",
            body: data
        }).then(response => response.json())
            .then(response => {
                if (response.status === "TOKEN_EXPIRED") {
                    localStorage.removeItem("jwt")
                    navigate("/login")
                }
                if (response.status === "OK") {
                    getChat()
                }
            })
            .catch(e => {
                alert("Błąd")
            })
    }

    function getChat() {
        const jwt = localStorage.getItem("jwt")
        const data = new FormData()
        data.append("jwt", jwt)
        data.append("receiver_id", receiver_id)

        fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/getChat`, {
            method: "POST",
            body: data
        }).then(response => response.json())
            .then(response => {
                if (response.status === "TOKEN_EXPIRED") {
                    localStorage.removeItem("jwt")
                    navigate("/login")
                }
                if (response.status === "INVALID_USER") {
                    navigate("/")
                }
                setChat(response.messages)
                setReceiverNick(response.receiver_nick)
            })
            .catch(e => {

            })

    }

    useEffect(() => {
        getChat()

        const int = setInterval(getChat, 2000)

        return () => {
            clearInterval(int)
        }
    }, [])

    return (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
            <Paper elevation={2} sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 2, border: 1 }}>
                <Avatar sx={{ bgcolor: randomColor(receiver_id) }}>{getInitials(receiverNick)}</Avatar>
                <Box sx={{ fontWeight: 900, fontSize: 30 }}>{receiverNick}</Box>
            </Paper>
            <Box sx={{ p: 2, gap: 2, flexGrow: 1, display: "flex", overflow: "hidden", flexDirection: "column" }}>
                <Box sx={{ flexGrow: 1, flexBasis: 0, overflow: "scroll" }}>
                    {chat.map(m => <ChatMessage key={m.message_id} message={m}></ChatMessage>)}
                    {chat.length === 0 && <Box sx={{ textAlign: 'center', paddingTop: 3, color: '#909090' }}>Konwersacja jeszcze nie rozpoczęta</Box>}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField maxRows={2} multiline fullWidth InputProps={{ sx: { borderRadius: 100 } }} placeholder='Napisz wiadomość...' inputRef={messageInput}></TextField>
                    <Button variant='contained' sx={{ p: 2, m: 1, borderRadius: 100 }} onClick={sendMessage}>
                        <Send fontSize='large' sx={{ color: "white" }}></Send>
                    </Button>
                </Box>
            </Box>
        </Box >
    )
}

export default ChatBox
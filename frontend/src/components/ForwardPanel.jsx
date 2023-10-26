import { Box, Button, Checkbox, Paper } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForwardPanel = ({ message_id, message_content, users, closeModal }) => {
    const navigate = useNavigate()
    const [forwardTo, setForwardTo] = useState([])

    function updateForward(id) {
        if (forwardTo.indexOf(id) !== -1) {
            setForwardTo(forwardTo.filter(e => e !== id))
        }
        else {
            setForwardTo([...forwardTo, id])
        }
    }

    function forwardMessage() {
        if (forwardTo.length == 0) return

        const data = {
            jwt: localStorage.getItem("jwt"),
            message_id: message_id,
            forward_to: forwardTo
        }

        fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/forwardMessage`, {
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
                if (response.status !== "OK") {
                    alert(response.status)
                }
                else {
                    closeModal()
                }
            })
            .catch(e => {
                alert("Błąd")
            })
    }

    return (
        <Paper elevation={5} sx={{ backgroundColor: "white", p: 3, overflow: "hidden", width: "100%" }}>
            <Box>
                <Box sx={{ fontWeight: 900, marginBottom: 3, textAlign: "center", fontSize: 25 }}>Prześlij dalej</Box>
                
                <Box sx={{p: 1, borderRadius: 2, backgroundColor: blue[100]}}>
                    {(message_content.length > 110) ? (message_content.substr(0, 100) + "...") : message_content}
                </Box>
                <Box sx={{ overflowY: "scroll", maxHeight: "400px", marginTop: 3}}>
                    {(users.length > 0) && users.map(user =>
                        <Box sx={{ display: "flex", gap: 2, borderBottom: 1, m: 1 }} key={user.user_id}>
                            <Box sx={{ display: "flex", alignItems: "center", flexBasis: "0", flexGrow: 1 }}>{user.user_nick}</Box>
                            <Box><Checkbox onChange={() => updateForward(user.user_id)}></Checkbox></Box>
                        </Box>
                    )}
                </Box>
                <Box sx={{ textAlign: "right", marginTop: 3 }}>
                    <Button variant='contained' onClick={forwardMessage}>Prześlij</Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default ForwardPanel
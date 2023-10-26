import { Box, Button, Checkbox, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForwardPanel = ({ message_id, users, closeModal }) => {
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
        <Paper elevation={5} sx={{ backgroundColor: "white", p: 3, maxHeight: "10%", overflow: "hidden", minWidth: "300px" }}>
            <Box>
                <Box sx={{fontWeight: 900, marginBottom: 3, textAlign: "center"}}>Prześlij dalej</Box>
                {(users.length > 0) && users.map(user => 
                    <Box sx={{display: "flex", gap: 2}} key={user.user_id}>
                        <Box sx={{display: "flex", alignItems: "center", flexBasis: "0", flexGrow: 1}}>{user.user_nick}</Box>
                        <Box><Checkbox onChange={() => updateForward(user.user_id)}></Checkbox></Box>
                    </Box>
                )}
                <Box sx={{textAlign: "right", marginTop: 3}}>
                    <Button variant='contained' onClick={forwardMessage}>Prześlij</Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default ForwardPanel
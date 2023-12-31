import { Delete, ForwardToInbox } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MessageSettings = ({ incoming, message_id, openForwardPanel, getChat }) => {
    const navigate = useNavigate()

    function deleteMessage() {
        const jwt = localStorage.getItem("jwt")

        const data = {
            "jwt": jwt,
            "message_id": message_id
        }

        fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/deleteMessage`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                if (response.status === "TOKEN_EXPIRED" || response.status === "INVALID_LOGIN") {
                    localStorage.removeItem("jwt")
                    navigate("/login")
                }
                if (response.status !== "OK") {
                    alert(response.status)
                }
                else {
                    getChat()
                }
            })
            .catch(e => {

            })
    }

    return (
        <Box sx={{ position: 'absolute', top: 0, left: incoming ? "100%" : "unset", right: incoming ? "unset" : "100%" }}>
            {!incoming && <IconButton children={<Delete fontSize='small'></Delete>} onClick={deleteMessage}></IconButton>}
            {incoming && <IconButton children={<ForwardToInbox fontSize='small'></ForwardToInbox>} onClick={openForwardPanel}></IconButton>}
        </Box>
    )
}

export default MessageSettings
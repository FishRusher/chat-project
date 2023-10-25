import { Box } from '@mui/material'
import { blue, green } from '@mui/material/colors'
import React from 'react'
import { getStringDate } from '../functions'
import MessageSettings from './MessageSettings'


const ChatMessage = ({ message }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: message.incoming ? "flex-start" : "flex-end" }}>
            <Box sx={{ maxWidth: "80%", m: 1 }}>
                <Box sx={{ color: "#909090", textAlign: message.incoming ? "left" : "right" }}>{getStringDate(message.message_date)}</Box>
                <Box sx={{ backgroundColor: message.incoming ? blue[50] : green[300], p: 1, borderRadius: 2, position: 'relative' }}>
                    <MessageSettings incoming={message.incoming} message_id={message.message_id}></MessageSettings>
                    <Box>
                        {message.message_content}
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default ChatMessage
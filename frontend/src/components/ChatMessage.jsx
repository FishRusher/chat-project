import { Box } from '@mui/material'
import { blue, green } from '@mui/material/colors'
import React from 'react'
import { getStringDate } from '../functions'
import MessageSettings from './MessageSettings'


const ChatMessage = ({ message, openForwardPanel, getChat }) => {

    function getStyles() {
        let styles = {
            p: 1,
            position: "relative"
        }
        if (message.forwarded) {
            styles = { ...styles, backgroundColor: "#DEE1E388", borderLeft: "3px solid #84929c88" }
        }
        else {
            styles = {
                ...styles,
                borderRadius: 2,
                backgroundColor: message.incoming ? blue[100] : green[300]
            }
        }
        return styles
    }

    return (
        <Box sx={{ display: "flex", justifyContent: message.incoming ? "flex-start" : "flex-end" }}>
            <Box sx={{ maxWidth: "80%", m: 1 }}>
                <Box sx={{ color: "#909090", textAlign: message.incoming ? "left" : "right" }}>{getStringDate(message.message_date)}</Box>
                <Box sx={getStyles()}>
                    {(!message.forwarded) && <MessageSettings getChat={getChat} incoming={message.incoming} message_id={message.message_id} openForwardPanel={() => openForwardPanel(message.message_id, message.message_content)}></MessageSettings>}
                    <Box>
                        {message.message_content}
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default ChatMessage
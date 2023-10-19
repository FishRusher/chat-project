import { Delete, ForwardToInbox } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'

const MessageSettings = ({incoming}) => {
  return (
    <Box sx={{position: 'absolute', top: 0, left: incoming ?  "100%" : "unset", right: incoming ? "unset" : "100%"}}>
        {!incoming && <IconButton children={<Delete fontSize='small'></Delete>}></IconButton>}
        {incoming && <IconButton children={<ForwardToInbox fontSize='small'></ForwardToInbox>}></IconButton>}
    </Box>
  )
}

export default MessageSettings
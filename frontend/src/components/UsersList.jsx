import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserBar from './UserBar'
import { HelpOutline } from "@mui/icons-material"

const UsersList = ( {users}) => {

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ fontWeight: 900, fontSize: 30, textAlign: "center", p: 2 }}>Użytkownicy</Box>
            <Box sx={{ overflowY: "scroll", overflowX: "hidden", flexGrow: 1 }}>
                <Box>
                    {(users.length > 0) ? (users.map(u => <UserBar key={u.user_id} user={u}></UserBar>))
                        : <Box sx={{ textAlign: "center" }}><HelpOutline fontSize="large"></HelpOutline></Box>}
                </Box>
            </Box>
        </Box>
    )
}

export default UsersList
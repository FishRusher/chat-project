import { Avatar, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

const UsersList = () => {

    const [users, setUsers] = useState([])

    function getUsers() {
        //Request do bazy
        setUsers([
            {user_id: 1, user_nick: "jan"},
            {user_id: 1, user_nick: "jan"},
            {user_id: 1, user_nick: "jan"},
            {user_id: 1, user_nick: "jan"},
        ])
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ fontWeight: 900, fontSize: 20, textAlign: "center" }}>Użytkownicy</Box>
            <Box>
                {users.map(u => <Avatar key={u.user_id}>{u.user_nick}</Avatar>)}
            </Box>
        </Box>
    )
}

export default UsersList
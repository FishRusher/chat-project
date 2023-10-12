import { Avatar, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserBar from './UserBar'

const UsersList = () => {

    const [users, setUsers] = useState([])

    function getUsers() {
        const jwt = localStorage.getItem("jwt")
        const data = new FormData()
        data.append("jwt", jwt)

        // fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/getUsers`, {
        //     method: "GET",
        //     body: data
        // }).then(response => response.json())
        // .then(response => setUsers(response))

        setUsers([
            { user_id: 1, user_nick: "jan" },
            { user_id: 2, user_nick: "Miichał" },
            { user_id: 3, user_nick: "jan" },
            { user_id: 5, user_nick: "jan" },
            { user_id: 6, user_nick: "jan" },
            { user_id: 7, user_nick: "jan" },
            { user_id: 8, user_nick: "jan" },
            { user_id: 9, user_nick: "jan" },
            { user_id: 10, user_nick: "jan" },
            { user_id: 11, user_nick: "jan" },
            { user_id: 12, user_nick: "jan" },
            { user_id: 13, user_nick: "jan" },
            { user_id: 14, user_nick: "jan" },
            { user_id: 15, user_nick: "jan" },
            { user_id: 16, user_nick: "jan" },
        ])
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ fontWeight: 900, fontSize: 30, textAlign: "center", p: 2 }}>Użytkownicy</Box>
            <Box sx={{ overflowY: "scroll", overflowX: "hidden", flexGrow: 1 }}>
                <Box>
                    {users.map(u => <UserBar key={u.user_id} user={u}></UserBar>)}

                </Box>
            </Box>
        </Box>
    )
}

export default UsersList
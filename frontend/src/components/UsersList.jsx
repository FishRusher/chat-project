import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserBar from './UserBar'
import { HelpOutline } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom'

const UsersList = () => {
    const [error, setError] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        function getUsers() {
            const jwt = localStorage.getItem("jwt")
            const data = {}
            data["jwt"] = jwt

            fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/getUsers`, {
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
                    setUsers(response.users)
                    setError(false)
                })
                .catch(e => {
                    setError(true)
                })
        }

        getUsers()
    }, [])

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ fontWeight: 900, fontSize: 30, textAlign: "center", p: 2 }}>Użytkownicy</Box>
            <Box sx={{ overflowY: "scroll", overflowX: "hidden", flexGrow: 1 }}>
                <Box>
                    {(!error) ? (users.map(u => <UserBar key={u.user_id} user={u}></UserBar>))
                        : <Box sx={{ textAlign: "center" }}><HelpOutline fontSize="large"></HelpOutline></Box>}
                </Box>
            </Box>
        </Box>
    )
}

export default UsersList
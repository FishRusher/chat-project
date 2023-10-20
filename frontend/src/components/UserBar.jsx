import { Avatar, Button, Card } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { getInitials, randomColor } from '../functions'

const UserBar = ({ user }) => {

    return (
        <NavLink to={"/" + user.user_id}>
            {({ isActive }) =>
                <Card variant='outlined' sx={{ m: 1 }}>
                    <Button variant={isActive ? "contained" : "text"} startIcon={<Avatar sx={{ bgcolor: randomColor(user.user_id) }}>{getInitials(user.user_nick)}</Avatar>} sx={{ width: "100%", justifyContent: "flex-start", p: 2 }}>
                        {user.user_nick}
                    </Button>
                </Card>
            }
        </NavLink>
    )
}

export default UserBar
import { Avatar, Button, Card } from '@mui/material'
import React from 'react'

const UserBar = ({ user }) => {
    function getInitials(nick) {
        let letters = [...nick]
        let n = letters.length
        return letters[0] + letters[parseInt(n / 2)]
    }

    function randomColor(n) {
        n = n * n * n * n
        n *= 53
        let r, g, b
        r = n % 255
        n *= 83
        g = n % 255
        n *= 59
        b = n % 255
        return `rgb(${r},${g},${b})`
    }

    return (
        <Card variant='outlined' sx={{ m: 1 }}>
            <Button startIcon={<Avatar sx={{ bgcolor: randomColor(user.user_id) }}>{getInitials(user.user_nick)}</Avatar>} sx={{ width: "100%", justifyContent: "flex-start", p: 2 }}>
                {user.user_nick}
            </Button>
        </Card>
    )
}

export default UserBar
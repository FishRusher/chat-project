import { Alert, Box } from '@mui/material'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

const AlertLogger = forwardRef((props, ref) => {
    
    const [alerts, setAlert] = useState([])

    function deleteAlert() {
        setAlert(prev => prev.filter((v, id) => id !== 0))
    }

    function addAlert(alert) {
        setAlert(a => [...a, {...alert, id: Math.floor(Math.random() * 100000)}])
        setTimeout(() => {
            deleteAlert()
        }, 4000)
    }

    useImperativeHandle(ref, () => {
        return {addAlert}
    }, [])


    return (
        <Box sx={{position: "fixed", bottom: 20, right: 20, width: "300px"}}>
            {alerts && alerts.map(a => <Alert key={a.id} variant='filled' className='disappearing' sx={{m: 2}} severity={a.severity}>{a.content}</Alert>)}
        </Box>
    )
})  

export default AlertLogger
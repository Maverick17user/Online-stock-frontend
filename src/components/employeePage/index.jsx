import React from 'react'
import EmployeeProfile from './employeeProfile'
import {Container} from '@material-ui/core'
import Box from '@material-ui/core/Box'

export default ({match: {params: {id}}}) => {
    return (
        <Box component={Container} m={2}>
            <EmployeeProfile employeeId={id}/>
        </Box>
    )
}
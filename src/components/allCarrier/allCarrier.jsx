import React, {useEffect, useState} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useStyles from './allCarrierStyle'
import Spinner from '../spinner'
import TablePaginationActions from './tablePagination'
import TableRowsComponent from './tableRows'

function CustomPaginationActionsTable({allCarriers, delCarrier, editCarrier}) {
    const classes = useStyles()
    const [rows, setRows] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [loaded, setLoaded] = useState(false)
    const [inputValue, setInputValue] = useState({})
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    function handleChangePage(event, newPage) {
        setPage(newPage)
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    useEffect(() => {

        setRows(allCarriers)
        setLoaded(true)

    }, [allCarriers])

    const removeItem = (unp) => () => {
        delCarrier(unp)
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleEdit = (id) => () => {
        rows.forEach((item, indx) => rows[indx].isDisabled = false)

        let found = rows.find((elem, index) => elem.id === id)
        found.isDisabled = true
        setRows([...rows])
    }

    const handelEditInput = (e) => {
        setInputValue({...inputValue, [e.target.name]: e.target.value})
    }

    const searchFoundElem = (rows, _unp) => {
        const {carrier, email, tel} = inputValue
        let indx, found = null

        found = rows.find((elem) => elem.id === _unp)
        indx = rows.findIndex((elem) => elem.id === _unp)
        let newObj = {}
        if (carrier) {
            found.company = carrier
            newObj.company = carrier
        }

        if (email) {
            found.email = email
            newObj.email = email
        }

        if (tel) {
            found.tel = tel
            newObj.tel = tel
        }

        found.isDisabled = false

        let newArr = []
        for (let i = 0; i < rows.length; i++) {
            (i === indx) ? newArr.push(found) : newArr.push(rows[i])
        }
        setRows(newArr)
        return newObj
    }

    const handleNewCarrier = (unp) => () => {
        const foundElem = searchFoundElem(rows, unp)
        editCarrier(foundElem, unp)
    }
    const tableCells = [
        {type: 'text', name: 'carrier', typeComponent: 'th', scope: 'row', action: handelEditInput},
        {type: 'text', name: 'email', float: 'left', action: handelEditInput},
        {type: 'number', name: 'tel', float: 'left', action: handelEditInput},
    ]
    const thHead = [
        {id: 1, label: 'Carrier'},
        {id: 2, label: 'Email', float: 'left'},
        {id: 3, label: 'Phone', float: 'left'},
        {id: 4, float: 'left'},
    ]

    return (
        <Container fixed>
            <Box className={classes.root}>
                <Box mb={3} display="flex" justifyContent="center">
                    <Typography variant="h4">
                        Carriers list
                    </Typography>
                </Box>
                <Box>
                    <Table>
                        <TableBody>
                            <TableRow>{
                                thHead.map((item) => (
                                    <TableCell 
                                        key={item.id}
                                        align={item.float}
                                    > 
                                        <b>{item.label}</b> 
                                    </TableCell>
                                ))
                            }</TableRow>
                            {!loaded
                                ? <Spinner/>
                                : rows.map((row) => (
                                    <TableRowsComponent
                                        key={row.id}
                                        tableCells={tableCells}
                                        row={row}
                                        handleNewCarrier={handleNewCarrier}
                                        handleEdit={handleEdit}
                                        removeItem={removeItem}
                                    />
                                ))
                            }
                            {emptyRows > 0 && (
                                <TableRow style={{height: 35 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10]}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Box>
            </Box>
        </Container>
    )
}
export default CustomPaginationActionsTable
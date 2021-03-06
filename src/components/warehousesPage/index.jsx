import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useAddWarehouse, useDelWarehouse, useGetWarehouses} from '../../api/apiRequests'
import {authUserFilter} from '../../filters'
import WarehousePage from './warehousePage'
import successSwal from '../swal/findSwal'
import {useReset} from '../../hooks/hook'

export default () => {
    const [formKey, resetForm] = useReset()
    const [tableKey, resetTable] = useReset()

    const handleResetForm = () => {
        resetForm()
        successSwal()
    }

    const handleResetTable = () => {
        resetTable()
        successSwal()
    }

    const [getWarehouses, warehouses] = useGetWarehouses()
    const [createWarehouse, ,createWarehouseError] = useAddWarehouse(handleResetForm)
    const [deleteWarehouse] = useDelWarehouse(handleResetTable)

    const authUser = useSelector(authUserFilter)

    useEffect(getWarehouses, [])

    return <WarehousePage
        formKey={formKey}
        tableKey={tableKey}
        createWarehouse={createWarehouse}
        createWarehouseError={createWarehouseError}
        deleteWarehouse={deleteWarehouse}
        warehouses={warehouses}
        authUser={authUser}
    />
}

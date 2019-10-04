import {combineReducers} from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import adminCompanyStatisticReduser from './adminsCompanyStatisticReduser'
import companiesListReduser from './companiesListReduser'
import companyReduser from './companyReduser'
import warehouseReduser from './warehouseReduser'
import carriersReducer from './carriersReducer'
import warehousingFlagRegucer from './warehousingFlagRegucer'
import warehousingActiveStockReducer from './warehousingActiveStockReducer'
import {normalize} from '../utils/utils'
import {EMPLOYEE, EMPLOYEES,CARRIER,CARRIERS,DRIVER,DRIVERS,TTN,TTNS} from '../actions/types'


function createNormalReducer(singular, plural) {
    return (store = {}, {type, data}) => {
        switch (type) {
            case plural:
                return data.reduce(normalize, {})
            case singular:
                return {...store, [data.id]: data}
            case `DELETE_${singular}`:
                const newStore = {...store}
                delete newStore[data.id]
                return newStore
            default:
                return store
        }
    }
}

function createBestReducer(singular, plural) {
    return (store = {}, {type, data}) => {
        switch (type) {
            case plural:
                return data.reduce(normalize, {})
            case singular:
                return {...store, data}
            case `DELETE_${singular}`:
                const newStore = {...store}
                delete newStore[data.data.id]
                return newStore
            default:
                return store
        }
    }
}

const employees = createNormalReducer(EMPLOYEE, EMPLOYEES)
const carriers = createBestReducer(CARRIER,CARRIERS)
const drivers = createBestReducer(DRIVER,DRIVERS)
const ttns = createNormalReducer(TTN,TTNS)

export default combineReducers({
    employees,
    carriers,
    drivers,
    ttns,
    errors: errorReducer,
    auth: authReducer,
    adminCompanyStatistic: adminCompanyStatisticReduser,
    companiesList: companiesListReduser,
    currentCompany: companyReduser,
    warehouses: warehouseReduser,
    carriersReducer: carriersReducer,
    warehousingFlag: warehousingFlagRegucer,
    warehousingActiveStock: warehousingActiveStockReducer
})
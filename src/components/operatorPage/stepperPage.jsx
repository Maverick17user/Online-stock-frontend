import React, {Fragment, useState} from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import useStyles from './operatorPageStyles'
import CarrierForm from './carrierForm'
import DriverForm from './driverForm'
import TTNForm from './TTNform'
import Search from './search'
import ExpansionPanel from './expansionPanel'
import SuccessPage from './successPage'

const steps = ['Carrier check', 'Driver check', 'Create TTN']

export default ({
                    activeStep, setActiveStep, searchCarrier, searchCarrierError, createCarrier, createCarrierError,
                    searchDriver, searchDriverError, createDriver, createDriverError, createTtn, createTtnError,
                    carriers, drivers, authUser, services
                }) => {

    const classes = useStyles()

    const [carrierFormVisibility, setCarrierFormVisibility] = useState(false)
    const [driverFormVisibility, setDriverFormVisibility] = useState(false)
    const [carrierId, setCarrierId] = useState('')
    const [driverId, setDriverId] = useState('')

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <Fragment>
                    <Search
                        formVisibility={carrierFormVisibility}
                        setFormVisibility={setCarrierFormVisibility}
                        search={searchCarrier}
                        searchText="Search carrier by UNP"
                        error={searchCarrierError.carrier}
                        value={carrierId}
                        setValue={setCarrierId}

                    />
                    {searchCarrierError.carrier && (
                        <ExpansionPanel
                            formVisibility={carrierFormVisibility}
                            setFormVisibility={setCarrierFormVisibility}
                            Form={CarrierForm}
                            onSubmit={createCarrier}
                            error={createCarrierError}
                            id={carrierId}
                            value={carrierId}
                        />
                    )}
                </Fragment>
            case 1:
                return <Fragment>
                    <Search
                        formVisibility={driverFormVisibility}
                        setFormVisibility={setDriverFormVisibility}
                        search={searchDriver}
                        searchText="Search driver by driver license"
                        error={searchDriverError.driver}
                        value={driverId}
                        setValue={setDriverId}
                    />
                    {searchDriverError.driver && (
                        <ExpansionPanel
                            value={driverId}
                            formVisibility={driverFormVisibility}
                            setFormVisibility={setDriverFormVisibility}
                            Form={DriverForm}
                            onSubmit={createDriver}
                            error={createDriverError}
                            id={driverId}
                        />
                    )}
                </Fragment>
            case 2:
                return <TTNForm
                    carrier={carriers[carrierId]}
                    driver={drivers[driverId]}
                    onSubmit={createTtn}
                    error={createTtnError}
                    authUser={authUser}
                    services={services}

                />
            case 3:
                return <SuccessPage
                    setActiveStep={setActiveStep}
                />
            default:
                return 'Unknown step'
        }
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {getStepContent(activeStep)}
        </div>
    )
}

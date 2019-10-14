import React, {Fragment, useState} from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator'
import Grid from '@material-ui/core/Grid'
import useStyles from './operatorPageStyles'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import generator from 'generate-password'

import InputText from '../fields/textField'
import CargoTable from './cargoTable'

export default ({onSubmit, error, authUser, carrier, driver}) => {

    const [TTN, setTTN] = useState({
        number: '',
        carrier: {
            unp: carrier.id,
            tel: carrier.tel,
            company: carrier.company
        },
        driver: {
            name: `${driver.name} ${driver.surname}`,
            license: driver.id
        },
        registrar: {
            name: `${authUser.firstName} ${authUser.patronymic} ${authUser.lastName}`,
            id: authUser.id
        },
        carNumber: '',
        warehouseCompany: authUser.company,
        owner: '',
    })

    const randomId = generator.generate({
        length: 10,
        numbers: true
    })

    const [cargo, setCargo] = useState([])

    const [product, setProduct] = useState({
        type: '',
        amount: '',
        name: '',
        id: randomId
    })

    const handleChangeProduct = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }

    const handleAddProduct = (e) => {
        e.preventDefault()

        setProduct({...product, id: randomId})
        setCargo([...cargo, product])
    }

    const handleDeleteProduct = (index) => {
        const array = [...cargo]
        array.splice(index, 1)
        setCargo([...array])
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {...TTN}
        data.products = cargo
        onSubmit(data)
    }

    const classes = useStyles()

    return (
        <Fragment>
            <Container component="main" maxWidth="xl">
                <CssBaseline/>
                <div className={classes.paperTTN}>
                    <ValidatorForm className={classes.TTNform} onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xl={4}>
                            </Grid>
                            <Grid item xl={1}>
                                <Typography component="h1" variant="h5" className={classes.TTNhead}>
                                    TTN №
                                </Typography>
                            </Grid>
                            <Grid item xl={2}>
                                <InputText
                                    min={10}
                                    max={15}
                                    pattern={/^[0-9]*$/}
                                    fullWidth
                                    label="TTN number"
                                    required
                                    name="number"
                                    error={error}
                                    value={TTN}
                                    handleChange={setTTN}
                                    helperClass={classes.error}
                                />
                            </Grid>
                            <Grid item xl={4}>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xl={1} className={classes.gridItem}>
                                <Typography component="h1" variant="h6" className={classes.TTNhead}>
                                    Cargo owner:
                                </Typography>
                            </Grid>
                            <Grid item xl={10}>
                                <InputText
                                    min={2}
                                    max={30}
                                    pattern={/.*/}
                                    fullWidth
                                    label="Owner information"
                                    required
                                    name="owner"
                                    error={error}
                                    value={TTN}
                                    handleChange={setTTN}
                                    helperClass={classes.error}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={classes.formContainer}>
                            <Grid item xl={1} className={classes.gridItem}>
                                <Typography component="h1" variant="h6" className={classes.TTNhead}>
                                    Carrier info:
                                </Typography>
                            </Grid>
                            <Grid item xl={10}>
                                <TextValidator
                                    fullWidth
                                    disabled={true}
                                    label={`UNP №  ${TTN.carrier.unp}, phone number:  ${TTN.carrier.tel}, company name: ${TTN.carrier.company}`}
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xl={1} className={classes.gridItem}>
                                <Typography component="h1" variant="h6" className={classes.TTNhead}>
                                    Driver info:
                                </Typography>
                            </Grid>
                            <Grid item xl={3}>
                                <TextValidator
                                    fullWidth
                                    disabled={true}
                                    label={`Name: ${TTN.driver.name}, driver license № ${TTN.driver.license}`}
                                />
                            </Grid>
                            <Grid item xl={1} className={classes.gridItem}>
                                <Typography component="h1" variant="h6" className={classes.TTNhead}>
                                    Car number:
                                </Typography>
                            </Grid>
                            <Grid item xl={1}>
                                <InputText
                                    min={6}
                                    max={10}
                                    pattern={/.*/}
                                    fullWidth
                                    label="Number of the car"
                                    required
                                    name="carNumber"
                                    error={error}
                                    value={TTN}
                                    handleChange={setTTN}
                                    helperClass={classes.error}
                                />
                            </Grid>
                            <Grid item xl={2} className={classes.gridItem}>
                                <Typography component="h1" variant="h6" className={classes.TTNheadEnd}>
                                    Company recipient:
                                </Typography>
                            </Grid>
                            <Grid item xl={2}>
                                <TextValidator
                                    fullWidth
                                    disabled={true}
                                    label={TTN.warehouseCompany}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xl={12} style={{marginTop: '3%', marginBottom: '1%'}}>
                                <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>
                                    Add product to cargo:
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xl={1} className={classes.gridItem}>
                                <Typography component="h1" variant="h6" className={classes.TTNhead}>
                                    Product name:
                                </Typography>
                            </Grid>
                            <Grid item xl={3}>
                                <InputText
                                    min={2}
                                    max={30}
                                    pattern={/.*/}
                                    fullWidth
                                    label="product name"
                                    required
                                    name="name"
                                    error={error}
                                    value={product}
                                    handleChange={setProduct}
                                    helperClass={classes.error}
                                />
                            </Grid>
                            <Grid item xl={1} className={classes.gridItem}>
                                <Typography component="h1" variant="h6" className={classes.TTNhead}>
                                    Amount:
                                </Typography>
                            </Grid>
                            <Grid item xl={1}>
                                <InputText
                                    min={1}
                                    max={7}
                                    pattern={/^[1-9]*$/}
                                    fullWidth
                                    label="product amount"
                                    required
                                    name="amount"
                                    error={error}
                                    value={product}
                                    handleChange={setProduct}
                                    helperClass={classes.error}
                                />
                            </Grid>
                            <Grid item xl={1} className={classes.gridItem}>
                                <Typography component="h1" variant="h6" className={classes.TTNhead}>
                                    Type of packaging:
                                </Typography>
                            </Grid>
                            <Grid item xl={1}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="outlined-age-simple">
                                        Type of packaging
                                    </InputLabel>
                                    <Select
                                        required
                                        onChange={handleChangeProduct}
                                        value={product.type}
                                        inputProps={{
                                            name: 'type',
                                        }}
                                    >
                                        <MenuItem value={'Box'}>Box</MenuItem>
                                        <MenuItem value={'Without packaging'}>Without packaging</MenuItem>
                                        <MenuItem value={'Container'}>Container</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xl={2} className={classes.gridItem}>
                                <Button variant="contained" color="primary" style={{marginTop: '5%',}} type="button"
                                        onClick={handleAddProduct}>
                                    Add to current cargo list
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xl={12} style={{marginTop: '3%', marginBottom: '2%'}}>
                                <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>
                                    Cargo table:
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xl={1}>
                            </Grid>
                            <Grid item xl={10}>
                                <CargoTable
                                    cargoList={cargo}
                                    handleDeleteProduct={handleDeleteProduct}
                                />
                            </Grid>
                        </Grid>
                        {cargo.length > 0 && (<Grid container>
                            <Grid item xl={12} className={classes.gridItem}>
                                <Button variant="contained" color="primary" type="submit" style={{marginTop: '5%',}}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>)}
                    </ValidatorForm>
                </div>
            </Container>
        </Fragment>
    )
}

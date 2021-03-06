import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import AreaCard from './warehouseCard'
import useStyles from './warehousePageStyles'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import WarehouseDetailsForm from './warehouseFormComponents/warehouseDetailsForm'
import AreasCreator from './warehouseFormComponents/areasCreator'
import MapContainer from './warehouseFormComponents/mapContainer'
import useStateWithCallback from 'use-state-with-callback'
import {storage} from '../../fireBaseConfig'
import Avatar from "@material-ui/core/Avatar";
import {Typography} from "@material-ui/core";

const initialMapState = {
    mapVisibility: false,
    GPS: {}
}

export default ({onSubmit, error, company}) => {
    const classes = useStyles()

    const [warehouse, setWarehouse] = useState({
        name: '',
        license: '',
        type: false,
        totalArea: '',
        company: company,
        address: ''
    })

    const [totalArea, setTotalArea] = useState(10)
    const [originalArea, setOriginalArea] = useState(0)
    const [list, setList] = useState([])
    const [addArea, setAddArea] = useState(false)
    const [currentArea, setCurrentArea] = useState(10)
    const [location, setLocation] = useState('')
    const [mapState, setMapState] = useState(initialMapState)
    const [avatarUrl, setAvatarUrl] = useState('https://cdn.pixabay.com/photo/2014/04/03/00/38/house-308936_960_720.png')
    const [avatar, setAvatar] = useStateWithCallback(false, avatar => {
        if (avatar) {
            handleUpl()
            setAvatar(false)
        }
    })
    const handleInputChange = (e) => {
        setWarehouse({...warehouse, [e.target.name]: e.target.value})
    }

    const handleLocationChange = (e) => {
        setLocation(e)
    }

    const handleChangeArea = (value) => {
        setTotalArea(value)
    }

    const handleChangeCurrentArea = (value) => {
        setCurrentArea(value)
    }

    const handleChangeAddArea = (e) => {
        e.preventDefault()
        if (totalArea > 0) {
            setAddArea(true)
            setOriginalArea(totalArea)
            onSelectLocation()
        }
    }

    const handleAddArea = (e) => {
        e.preventDefault()
        handleChange(e, totalArea - currentArea)
        const area = {
            area: currentArea,
            type: warehouse.type,
            freeArea: currentArea,
            products: []
        }
        setList([...list, area])
    }

    const handleDeleteArea = (index, area) => {
        const array = [...list]
        array.splice(index, 1)
        setList([...array])
        setTotalArea(totalArea + area)
    }

    const unlock = () => {
        setAddArea(false)
        setList([])
    }

    const onSelectLocation = () => {
        const addressName = location

        setMapState({...mapState, mapVisibility: false})

        geocodeByAddress(addressName)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setMapState({
                    ...mapState,
                    GPS: latLng,
                    mapVisibility: true
                })
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const areas = list.map((elem, index) => {
            elem.index = index + 1
            return elem
        })

        const data = {
            company: warehouse.company,
            name: warehouse.name,
            license: warehouse.license,
            totalArea: originalArea,
            areas: areas,
            freeArea: originalArea,
            address: location,
            GPS: mapState.GPS,
            buildImg: avatarUrl
        }

        onSubmit(data, unlock)
    }

    const handleChange = (e, newValue) => {
        setTotalArea(newValue)
    }

    const handleUpldChange = e => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0])
        }

    }
    const handleUpl = () => {
        const uploadTask = storage.ref(`build/${avatar.name}`).put(avatar)
        uploadTask.on(
            'state_changed',
            snapshot => {
            },
            err => {
                console.error(err)
            },
            () => {
                storage
                    .ref('build')
                    .child(avatar.name)
                    .getDownloadURL()
                    .then(url => {
                        setAvatarUrl(url)
                    })
            }
        )
    }

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline/>
            <Box className={classes.main}>
                <Grid container spacing={5}>
                    <Grid item xl={6} sm={12}>
                        {!addArea ? (
                        <WarehouseDetailsForm
                            warehouse={warehouse}
                            totalArea={totalArea}
                            error={error}
                            handleChangeArea={handleChangeArea}
                            handleChangeAddArea={handleChangeAddArea}
                            onSelectLocation={onSelectLocation}
                            addArea={addArea}
                            setWarehouse={setWarehouse}
                            handleChange={handleChange}
                            handleUpldChange={handleUpldChange}
                            avatarUrl={avatarUrl}
                            avatar={avatar}
                            handleLocationChange={handleLocationChange}
                            location={location}
                            setAvatar={setAvatar}
                        />):<AreasCreator
                            warehouse={warehouse}
                            totalArea={totalArea}
                            currentArea={currentArea}
                            handleInputChange={handleInputChange}
                            handleChangeCurrentArea={handleChangeCurrentArea}
                            handleAddArea={handleAddArea}
                        />}
                        {(addArea && totalArea === 0) && (
                            <Container maxWidth="sm">
                                <Box mt={10}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={handleSubmit}
                                    >
                                        Create warehouse
                                    </Button>
                                </Box>
                            </Container>
                        )}
                        {(addArea && list.length === 0)&& (
                        <Container maxWidth="sm">
                            <Box mt={10}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="default"
                                    className={classes.submit}
                                    onClick={()=>{setAddArea(false)
                                        setMapState({...mapState, mapVisibility: false})}}
                                >
                                    Change data from previous form
                                </Button>
                            </Box>
                        </Container>)}
                    </Grid>

                    <Grid item xl={6} sm={12}>
                        {addArea &&
                        <Container>
                            <Typography component="h1" variant="h5" className={classes.h5}>
                                WAREHOUSE ({warehouse.name.toLocaleUpperCase()}) №{warehouse.license}
                            </Typography>
                        </Container>}
                        <MapContainer
                            mapVisibility={mapState.mapVisibility}
                            GPS={mapState.GPS}
                            zoom={15}
                            mapHeight={200}
                        />
                        {list.length > 0 && (
                            <Container item xl={6} sm={12}>
                                <AreaCard
                                    handleDeleteArea={handleDeleteArea}
                                    list={list}
                                />
                            </Container>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

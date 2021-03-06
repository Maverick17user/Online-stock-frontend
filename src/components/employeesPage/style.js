import {makeStyles} from '@material-ui/core'


export default makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: 'WhiteSmoke',
        },
    },
    formName: {
        marginBottom: theme.spacing(3),
    },
    helperText: {
        color: 'red'
    },
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        width: '100%'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(10),
    },
    submit: {
        width: '100%',
        margin: theme.spacing(4, 0, 0),
    },
    companyName: {
        marginTop: '3%'
    }
}))

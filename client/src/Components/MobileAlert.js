import {
    Box,
    Typography,
    makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles({
    mobile: {
        display: 'none',
        '@media (max-width:780px)': {
            display: 'block'
        },
        backgroundColor: '#56E39F',
        textAlign: 'center',
        padding: '2px',
    },
    mobileText: {
        color: 'white',
        fontSize: '10px'
    }
})

function MobileAlert() {
    const classes = useStyles()

    return (
        <Box className={classes.mobile}>
            <Typography className={classes.mobileText}>For a more optimal card editing experience, please use on desktop.</Typography>
        </Box>
    )
}

export default  MobileAlert

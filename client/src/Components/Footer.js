import { useLocation } from 'react-router-dom';
import {
    makeStyles,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        padding: '40px',
        textAlign: 'center'
    },
    text: {
        fontFamily: '"Roboto", sans-serif',
        postiion: 'absolute',
        color: 'gray',
        '@media (max-width:780px)': {
            fontSize: '10px'
        },
    },
    textHide: {
        display: 'none'
    },
    link: {
        color: 'gray'
    }
})

function Footer() {
    const classes = useStyles()
    const location = useLocation()

    const hide = (location.pathname !== '/')

    return (
        <footer className={classes.container}>
            <Typography className={hide? classes.textHide : classes.text}>© 2021 - Made by Claire Logan &nbsp;&nbsp; | &nbsp;&nbsp; <a href="https://github.com/clogan1" className={classes.link}>Github</a> &nbsp;&nbsp; | &nbsp;&nbsp; <a href="mailto: clairelogan16@gmai.com" className={classes.link}>Contact Claire</a></Typography>
        </footer>
    )
}

export default Footer

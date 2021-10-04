import React from 'react'
import {
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        padding: '40px',
    },
})

function Footer() {
    const classes = useStyles()

    return (
        <footer className={classes.container}>
            
        </footer>
    )
}

export default Footer

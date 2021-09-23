import {
    Box,
    makeStyles,
    Select,
    MenuItem
 } from '@material-ui/core';

 const useStyles = makeStyles({
    select: { 
        width: '150px',
        height: '30px',
        fontFamily: '"Roboto", sans-serif'
    },
    box: {
        marginTop: '20px'
    }
 })

function Sort() {
    const classes = useStyles()

    return (
        <Box className={classes.box}>
            <select className={classes.select}>
                <option value="newest">newest</option>
                <option value="popular">popular</option>
                <option value="newest">oldest</option>
            </select>

        </Box>
    )
}


export default Sort

import {
    Box,
    makeStyles,

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

function Sort( { sort, setSort }) {
    const classes = useStyles()

    function handleSort(e){
        setSort(e.target.value)
    }

    return (
        <Box className={classes.box}>
            <select className={classes.select} onChange={handleSort}>
                <option value="newest">newest</option>
                <option value="popular">popular</option>
                <option value="oldest">oldest</option>
            </select>

        </Box>
    )
}


export default Sort

import {
    Box,
    makeStyles,

 } from '@material-ui/core';

 const useStyles = makeStyles({
    select: { 
        width: '150px',
        height: '30px',
        fontFamily: '"Roboto", sans-serif',
        cursor: 'pointer',
    },
    box: {
        marginTop: '20px'
    }
 })

function Sort( { setSort, setPageNumber }) {
    const classes = useStyles()

    function handleSort(e){
        setSort(e.target.value);
        // setPageNumber(0)
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

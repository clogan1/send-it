import { useEffect, useState } from 'react'
import {
    Box,
    Checkbox,
    FormControlLabel,
    makeStyles,
 } from '@material-ui/core';

 const useStyles = makeStyles({
    checkRow: { 
        marginTop: '10px',
    },
    filterContainer: {
        marginBottom: '20px',
        marginTop: '20px'
    },
    checkbox: {
        // width: '40px',
    }
 })

function Filter() {
    const classes = useStyles()
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        fetch('/categories')
        .then(res => res.json())
        .then(cats => setCategories(cats))
    }, [])

    // console.log(categories)

    return (
        <Box className={classes.filterContainer}>
            {categories.map(category => 
                <Box className={classes.checkRow} key={category.id}>
                <input
                    type="checkbox" 
                    name={category.name}
                    className={classes.checkbox}
                />
                <label>&nbsp;{category.emoji} &nbsp;{category.name}</label>
                <br></br>
                </Box>
            )
            }     
        </Box>
    )
}

export default Filter

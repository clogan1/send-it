import { useState } from 'react'
import Filter from './Filter'
import Sort from './Sort'
import CardList from './CardList'
import {
    Box,
    Typography,
    makeStyles,
    Grid,

} from '@material-ui/core'

const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        height: '100%',
        flexGrow: 1,
    },
    filterContainer: {
        // backgroundColor: 'pink',
        height: '100vh',

    },
    filterText: {
        fontSize: '18px',

    },
    filterBox: {
        padding: '20px 20px 20px 20px'

    },
    cardContainer: {
        padding: '10px',
        backgroundColor: '#F3F2F2',
        height: '100%',
    }
})

function BrowseCardsPage( { cards } ) {
    const classes = useStyles()
    const [filter, setFilter] = useState([])
    const [sort, setSort] = useState('')

    return (
        <Box className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={2} className={classes.filterContainer}>
                    <Box className={classes.filterBox}>
                    <Typography className={classes.filterText}>filter by</Typography>
                        <Filter />
                    <Typography className={classes.filterText}>sort by</Typography>
                        <Sort />
                    </Box>
                </Grid>
                <Grid item xs={10} className={classes.cardContainer}>
                    <CardList cards={cards}/>
                </Grid>

            </Grid>
        </Box>
    
    )
}

export default BrowseCardsPage

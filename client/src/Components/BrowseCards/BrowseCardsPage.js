import { useState, useEffect} from 'react'
import Filter from './Filter'
import Sort from './Sort'
import CardList from './CardList'
import {
    Box,
    Typography,
    makeStyles,
    Grid,

} from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux";
import { getTemplates } from '../../Redux/Actions/index'

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

function BrowseCardsPage( { setEditTemplate, user, categories } ) {
    const classes = useStyles()
    const [filter, setFilter] = useState([])
    const [sort, setSort] = useState('newest')

    const templates = useSelector((state) => state.templates.templates);
    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(getTemplates())
    }, [])
  
    // console.log("from store", templates)

    const displayCards = templates.filter(card => {
        if(filter.length < 1){
            return card
        } else {
            return filter.includes(card.category.name)
        }
    })
    .sort((first, second) => {
        if(sort === 'newest'){
            if(first.id > second.id) return -1
        }
        else if (sort === 'oldest'){
            if(first.id < second.id) return -1

        }
        else if (sort === 'popular'){
            if(first.count_of_user_cards > second.count_of_user_cards) return -1
        }
    })

    return (
        <Box className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={2} className={classes.filterContainer}>
                    <Box className={classes.filterBox}>
                    <Typography className={classes.filterText}>filter by</Typography>
                        <Filter filter={filter} setFilter={setFilter} categories={categories}/>
                    <Typography className={classes.filterText}>sort by</Typography>
                        <Sort sort={sort} setSort={setSort}/>
                    </Box>
                </Grid>
                <Grid item xs={10} className={classes.cardContainer}>
                    <CardList cards={displayCards} 
                    setEditTemplate={setEditTemplate}
                    user={user}/>
                </Grid>

            </Grid>
        </Box>
    
    )
}

export default BrowseCardsPage

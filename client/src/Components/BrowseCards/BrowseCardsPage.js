import { useState, useEffect} from 'react'
import Filter from './Filter'
import Sort from './Sort'
import CardList from './CardList'
import ReactPaginate from 'react-paginate';
import {
    Box,
    Typography,
    makeStyles,
    Grid,
} from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux";
import { getTemplates } from '../../Redux/Actions/index';
import FadeIn from 'react-fade-in';

const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        height: '100%',
        flexGrow: 1,
    },
    filterContainer: {
        minWidth: '230px'

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
        
    },
    buttonDetail: {
        borderRadius: '12px',
        padding: '10px',
        margin: '8px',
        cursor: 'pointer',
        "&:hover": {fontWeight: 'bold'}
        },
    collapseFilter: {
        display: 'none',
        '@media (max-width:780px)': {
            display: 'block',
            backgroundColor: '#56E39F',
            textAlign: 'center',
            padding: '4px',
            color: 'white',
            marginBottom: '20px'
        },
    },
    filterContainerHide: {
        '@media (max-width:780px)': {
            minWidth: '230px',
            display: 'none'
        },
        minWidth: '230px',
    },
    toggleText: {
        fontSize: '18px'
    }
})

function BrowseCardsPage( { setEditTemplate, categories, setOpenModal } ) {
    const classes = useStyles()
    const [filter, setFilter] = useState([])
    const [sort, setSort] = useState('newest')
    const [pageNumber, setPageNumber] = useState(0)
    const [showFilter, setShowFilter] = useState(false)
    const [pageCount, setPageCount] = useState('')

    const templates = useSelector((state) => state.templates.templates);
    const dispatch = useDispatch()

    let cardsPerPage = 12
    let cardsVisted = pageNumber * cardsPerPage

    useEffect(() => {
      dispatch(getTemplates())
    }, [])

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
    // .slice(cardsVisted, cardsVisted + cardsPerPage)

    let paginatedCards = displayCards.slice(cardsVisted, cardsVisted + cardsPerPage)

    useEffect(() => {  
        if(filter.length < 1) {
            // let allCards = Math.ceil(templates.length / cardsPerPage)
            setPageCount(2)
        }
        else {
            let newLength = displayCards.length
            console.log("new lenght:", newLength)
            let pc = Math.ceil(newLength / cardsPerPage)
            console.log("page count:",  pc)
            setPageCount(pc)
        }
      }, [filter])

    function changePage({ selected }){
        setPageNumber(selected)
    }

    function toggleFilters(){
        setShowFilter(!showFilter)
    }

    return (
        <FadeIn>
        <Box className={classes.container}>
            <Box className={classes.collapseFilter}>
                <Typography className={classes.toggleText} onClick={toggleFilters}>{showFilter ? "- Hide" : "+ Show"} Filters</Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={2} className={showFilter? classes.filterContainer : classes.filterContainerHide}>
                    <Box className={classes.filterBox}>
                    <Typography className={classes.filterText}>filter by</Typography>
                        <Filter filter={filter} setFilter={setFilter} categories={categories} setPageNumber={setPageNumber}
                        />
                    <Typography className={classes.filterText} >sort by</Typography>
                        <Sort setSort={setSort} 
                        />
                    </Box>
                </Grid>
                <Grid item xs={10} className={classes.cardContainer}>
                    <CardList cards={paginatedCards} 
                    setEditTemplate={setEditTemplate}
                    setOpenModal={setOpenModal}
                    />

                    {(templates.length > cardsPerPage) ? 
                        <ReactPaginate 
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationButtons"}
                            previousLinkClassName={"previousButton"}
                            nextLinkClassName={"nextButton"}
                            disabledClassName={"pagDisabled"}
                            activeClassName={"pagActive"}
                        />
                :
                null
            }
                </Grid>
              
            </Grid>
        </Box>
        </FadeIn>
    
    )
}

export default BrowseCardsPage

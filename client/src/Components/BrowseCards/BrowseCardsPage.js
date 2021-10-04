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
        
    },
    // paginationButtons: {
    //     width: '80%',
    //     height: '40px',
    //     listStyle: 'none',
    //     display: 'flex',
    //     justifyContent: 'center',
        
    // },
    buttonDetail: {
        borderRadius: '12px',
        padding: '10px',
        margin: '8px',
        cursor: 'pointer',
        "&:hover": {fontWeight: 'bold'}
        }
})

function BrowseCardsPage( { setEditTemplate, categories, setOpenModal } ) {
    const classes = useStyles()
    const [filter, setFilter] = useState([])
    const [sort, setSort] = useState('newest')
    const [pageNumber, setPageNumber] = useState(0)
    // const [arrLength, setArrLength] = useState(0)
    // const [pageCount, setPageCount] = useState(0)
    //const [displayCardLength, setDisplayCardLength]= useState(12)

    const templates = useSelector((state) => state.templates.templates);
    const dispatch = useDispatch()

    const cardsPerPage = 20
    const cardsVisted = pageNumber * cardsPerPage
    const pageCount = Math.ceil(templates.length / cardsPerPage)


    // function pageCounter() {
    //     if(displayCards) {
    //         return Math.ceil(displayCards.length / cardsPerPage)
    //     }
    //     else return Math.ceil(templates.length / cardsPerPage)
    // }
  
    useEffect(() => {
      dispatch(getTemplates())
    //   setDisplayCardLength(templates.length)
    //   setArrLength(templates.length)
  
    }, [])


    // useEffect(() => {
    //     // setPageNumber(0)
    //     let newPc = Math.ceil(displayCards.length / cardsPerPage)
    //     setPageCount(newPc)
    //   }, [sort, filter])
  
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
    }).slice(cardsVisted, cardsVisted + cardsPerPage)

    // useEffect(() => {
    //     if(displayCards) {
    //         setDisplayCardLength(displayCards.length)
    //         const newLen = Math.ceil(displayCardLength / cardsPerPage)
    //         setPageCount(newLen)
    //     }
    // }, [filter, sort] )
    
    function changePage({ selected }){
        setPageNumber(selected)
    }

    return (
        <Box className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={2} className={classes.filterContainer}>
                    <Box className={classes.filterBox}>
                    <Typography className={classes.filterText}>filter by</Typography>
                        <Filter filter={filter} setFilter={setFilter} categories={categories} setPageNumber={setPageNumber}
                        />
                    <Typography className={classes.filterText} >sort by</Typography>
                        <Sort setSort={setSort} setPageNumber={setPageNumber}
                        />
                    </Box>
                </Grid>
                <Grid item xs={10} className={classes.cardContainer}>
                    <CardList cards={displayCards} 
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
    
    )
}

export default BrowseCardsPage

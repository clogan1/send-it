import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import RowItem from './RowItem';
import RowItemContrib from './RowItemContrib'
import ReactPaginate from 'react-paginate';
import {
    Box,
    Container,
    Typography,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import { useSelector } from "react-redux";
import FadeIn from 'react-fade-in';


const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        paddingTop: '20px',
        overflow: 'visible',
        flexGrow: 1,
    },
        header: {
            fontSize: '24px',
            fontWeight: '500',
            marginBottom: '10px',
            marginRight: '50px',
            float: 'left',
            cursor: 'pointer',
            "&:hover": {fontWeight: '600'},
            '@media (max-width:780px)': {
                fontSize: '20px',
            }

        },
        headerActive: {
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '10px',
            marginRight: '50px',
            float: 'left',
            cursor: 'pointer',
            '@media (max-width:780px)': {
                fontSize: '20px',
            }

        },
        headerText: {
            color: 'black',
            fontWeight: '600',
            fontSize: '14px',
        },
        sticky: {
            position: 'sticky',
            top: '0px',
            overflow: 'visible',

        },
        overflow: {
            overflow: 'visible'
        },
        mobileHide: {
            '@media (max-width:780px)': {
                display: 'none'
            },
            color: 'black',
            fontWeight: '600',
            fontSize: '14px',
        }
    })

function MyCardsPage( { setEditCard, handleMyCardDelete, setEditContrib}) {
    const classes = useStyles()
    const [toggleCards, setToggleCards] = useState(true)
    const [pageNumber, setPageNumber] = useState(0)
    const history = useHistory()

    const cards = useSelector((state) => state.myCards.myCards);
    const contribs = useSelector((state) => state.myCards.myContributions);
    const user = useSelector((state) => state.user.user);


    if(!user){
        history.push('/')
    }

    const cardsPerPage = 10
    const cardsVisted = pageNumber * cardsPerPage
    const pageCount = Math.ceil(cards.length / cardsPerPage)

    function handleCardToggle(){
        setToggleCards(true)
        setPageNumber(0)
    }

    function handleContributionToggle(){
        setToggleCards(false)
        setPageNumber(0)
    }

    const displayCards = cards.slice(cardsVisted, cardsVisted + cardsPerPage)

    const displayContribs = contribs.slice(cardsVisted, cardsVisted + cardsPerPage)

    function changePage({ selected }){
        setPageNumber(selected)
    }

    return (
        <FadeIn>
        <Box className={classes.container}>
            <Container className={classes.overflow}>
            <Box className={classes.sticky}>
                <Typography className={toggleCards? classes.headerActive : classes.header} onClick={handleCardToggle}>my cards</Typography>
                <Typography className={toggleCards? classes.header : classes.headerActive} onClick={handleContributionToggle}>my contributions</Typography>
            </Box>
            <TableContainer>
                <Table >
                    <TableHead className={classes.sticky}>
                        <TableRow >
                            <TableCell className={classes.headerText} >preview</TableCell>
                            <TableCell className={classes.headerText} >status</TableCell>
                            <TableCell className={classes.mobileHide} >date created</TableCell>
                            <TableCell className={classes.mobileHide} >date sent</TableCell>
                            <TableCell className={classes.headerText} >recipient</TableCell>
                            <TableCell className={classes.headerText} >actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {toggleCards ? 
                            displayCards.map(card => <RowItem card={card} key={card.id} handleMyCardDelete={handleMyCardDelete} setEditCard={setEditCard}/>)
                        :
                            displayContribs.map(contrib => <RowItemContrib contrib={contrib} key={contrib.id} card={contrib.user_card} setEditCard={setEditCard}
                            setEditContrib={setEditContrib} />)
                        }
                    </TableBody>
                </Table>
                {(cards.length > cardsPerPage) ? 

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
            </TableContainer>

            </Container>
        </Box>
        </FadeIn>
    )
}

export default MyCardsPage

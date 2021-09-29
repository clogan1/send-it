import { useState } from 'react'
import RowItem from './RowItem';
import ReactPaginate from 'react-paginate';
import {
    Box,
    Container,
    Typography,
    makeStyles,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import { useSelector } from "react-redux";


const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        height: '100%',
        minHeight: '100vh',
        paddingTop: '10px',
        flexGrow: 1,},
        header: {
            fontSize: '24px',
            fontWeight: '500',
            marginBottom: '10px',
            marginRight: '50px',
            float: 'left',
        },
        headerText: {
            color: 'black',
            fontWeight: '600',
            fontSize: '14px',
            position: 'sticky',
            top: '0',
        },
        sticky: {
            position: 'sticky',
            top: '0',
        }
    })

function MyCardsPage( { setEditCard, handleMyCardDelete}) {
    const classes = useStyles()
    const [toggleCards, setToggleCards] = useState(true)
    const [pageNumber, setPageNumber] = useState(0)

    const cards = useSelector((state) => state.myCards.myCards);

    const cardsPerPage = 10
    const cardsVisted = pageNumber * cardsPerPage
    const pageCount = Math.ceil(cards.length / cardsPerPage)

    function handleCardToggle(){
        setToggleCards(true)
    }

    function handleContributionToggle(){
        setToggleCards(false)
    }

    const displayCards = cards.slice(cardsVisted, cardsVisted + cardsPerPage)

    function changePage({ selected }){
        setPageNumber(selected)
    }

    return (
        <Box className={classes.container}>
            <Container>
            <Box className={classes.sticky}>
            <Typography className={classes.header} onClick={handleCardToggle}><strong>my cards</strong></Typography>
            <Typography className={classes.header} onClick={handleContributionToggle}>my contributions</Typography>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead >
                        <TableRow >
                            <TableCell className={classes.headerText} >preview</TableCell>
                            <TableCell className={classes.headerText} >status</TableCell>
                            <TableCell className={classes.headerText} >date created</TableCell>
                            <TableCell className={classes.headerText} >date sent</TableCell>
                            <TableCell className={classes.headerText} >recipient</TableCell>
                            <TableCell className={classes.headerText} >actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayCards.map(card => <RowItem card={card} key={card.id} handleMyCardDelete={handleMyCardDelete} setEditCard={setEditCard}/>)
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
    )
}

export default MyCardsPage

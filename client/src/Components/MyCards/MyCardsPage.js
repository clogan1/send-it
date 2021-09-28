import { useState } from 'react'
import RowItem from './RowItem'
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
        paddingTop: '10px',
        flexGrow: 1,},
        header: {
            fontSize: '24px',
            fontWeight: '500',
            marginBottom: '10px'
        },
        headerText: {
            color: 'black',
            fontWeight: '600',
            fontSize: '14px'
        }
    })

function MyCardsPage( { setEditCard, handleMyCardDelete}) {
    const classes = useStyles()
    const [toggleCards, setToggleCards] = useState(true)

    const cards = useSelector((state) => state.myCards.myCards);


    function handleCardToggle(){
        setToggleCards(true)
    }

    function handleContributionToggle(){
        setToggleCards(false)
    }

    return (
        <Box className={classes.container}>
            <Container>
            <Typography className={classes.header} onClick={handleCardToggle}><strong>my cards</strong></Typography>
            <Typography className={classes.header} onClick={handleContributionToggle}>my contributions</Typography>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.headerText} >preview</TableCell>
                            <TableCell className={classes.headerText} >status</TableCell>
                            <TableCell className={classes.headerText} >date created</TableCell>
                            <TableCell className={classes.headerText} >send date</TableCell>
                            <TableCell className={classes.headerText} >recipient</TableCell>
                            <TableCell className={classes.headerText} >actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map(card => <RowItem card={card} key={card.id} handleMyCardDelete={handleMyCardDelete} setEditCard={setEditCard}/>)
                        }
                    </TableBody>
                </Table>

            </TableContainer>


            </Container>
        </Box>
    )
}

export default MyCardsPage

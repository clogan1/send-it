import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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
} from '@material-ui/core'

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

function MyCardsPage( { user, setEditCard, myCards, setMyCards, handleMyCardDelete}) {
    const classes = useStyles()
    const [toggleCards, setToggleCards] = useState(true)

    const history = useHistory()


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
                        {myCards.map(card => <RowItem card={card} key={card.id} handleMyCardDelete={handleMyCardDelete} setEditCard={setEditCard}/>)
                        }
                    </TableBody>
                </Table>

            </TableContainer>


            </Container>
        </Box>
    )
}

export default MyCardsPage

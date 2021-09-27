import { useState, useEffect } from 'react'
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

function MyCardsPage( { user }) {
    const classes = useStyles()
    const [toggleCards, setToggleCards] = useState(true)
    const [myCards, setMyCards]= useState([])
    const [myContributions, setMyContributions]= useState([])

    useEffect(() => {
        if(user){
        fetch(`/users/${user.id}/user_cards`)
        .then(res => res.json())
        .then(setMyCards)
        }
    }, [])

    function handleCardToggle(){
        setToggleCards(true)
    }

    function handleContributionToggle(){
        setToggleCards(false)
    }

    function handleCardDelete(id){
        const newMyCards = myCards.filter(card => card.id !== id)
        setMyCards(newMyCards)
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
                        {myCards.map(card => <RowItem card={card} key={card.id} handleCardDelete={handleCardDelete}/>)
                        }
                    </TableBody>
                </Table>

            </TableContainer>


            </Container>
        </Box>
    )
}

export default MyCardsPage

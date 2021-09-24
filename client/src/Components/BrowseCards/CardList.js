import CardItem from './CardItem'
import {
    Box,
    Typography,
    makeStyles,
    Grid,
    Container
} from '@material-ui/core'

const useStyles = makeStyles({
   container : {
       backgroundColor: '#F3F2F2',
       paddingTop: '20px'
   }
})

function CardList({ cards, setEditTemplate, user }) {
    const classes = useStyles()

    // console.log("from list:", cards)

    return (
        <Container className={classes.container}>
            <Grid container spacing={3} 
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start">
            {cards.map(card => 
                <CardItem card={card} key={card.id} 
                setEditTemplate={setEditTemplate}
                user={user}/>  
                )
            }
            </Grid>
        </Container>
    )
}

export default CardList

import CardItem from './CardItem'
import {
    makeStyles,
    Grid,
    Container
} from '@material-ui/core';
import FadeIn from 'react-fade-in';


const useStyles = makeStyles({
   container : {
       backgroundColor: '#F3F2F2',
       paddingTop: '20px'
   },
   mobileCenter: {
    '@media (max-width:780px)': {
        justifyContent: 'center',
    }
   }
})

function CardList({ cards, setEditTemplate, setOpenModal }) {
    const classes = useStyles()

    return (
        <FadeIn>
        <Container className={classes.container}>
            <Grid container spacing={3} 
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                className={classes.mobileCenter}>
            {cards.map(card => 
                <CardItem card={card} key={card.id} 
                setEditTemplate={setEditTemplate}
                setOpenModal={setOpenModal}
                />  
                ) 
            }
            </Grid>
        </Container>
        </FadeIn>
    )
}

export default CardList

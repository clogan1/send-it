import { useHistory } from 'react-router-dom'
import {
    Box,
    Typography,
    makeStyles,
    Grid,
    Card
} from '@material-ui/core';
import { useSelector } from "react-redux";


const useStyles = makeStyles({
   cardContainer : {
       backgroundColor: 'white',
       width: '350px',
       justifyContent: 'center',
       padding: '20px 0 20px',
       overflow: 'hidden',
       
   },
   image: {
       width: '200px',
    //    border: '1px solid black',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        padding: '5px',
       transition: 'transform .3s ease',
        "&:hover": {transform: 'scale(1.5)'}
   },
   button: {
       backgroundColor: '#56E39F',
       fontFamily: '"Roboto", sans-serif',
       fontSize: '14px',
       width: '200px',
       borderStyle: 'none',
       height: '30px',
       borderRadius: '12px',
       marginTop: '10px',
       "&:hover": {backgroundColor: '#84EBB9'}

   },
   gridBox : {
    justifyContent: 'center',
    textAlign: 'center'
   }
})

function CardItem({ card, setEditTemplate, setOpenModal }) {
    const classes = useStyles()
    const history = useHistory();

    const user = useSelector((state) => state.user.user);


    // console.log(card)

    function handleCreateCard(){
        if(!user){
            setOpenModal(true)
            console.log("You need to be signed in")
        }
        else{
            setEditTemplate(card)
            history.push('/createcard')
        }
    }

    return (
        <Grid item xs={4} className={classes.gridBox}>
        <Card className={classes.cardContainer} elevation={3}>
            <img src={card.art_url} className={classes.image}/>
            <button className={classes.button} onClick={handleCreateCard}>use this cover</button>
        </Card>
        </Grid>
    )
}

export default CardItem

import { useHistory } from 'react-router-dom'
import {
    Box,
    Container,
    Typography,
    makeStyles,
    TableCell,
    TableRow
} from '@material-ui/core';
import { useDispatch } from "react-redux";
import { deleteMyCard } from '../../Redux/Actions/index'


const useStyles = makeStyles({
    prevImage: {
        width: '50px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',

    },
    text : {
        fontWeight: '500',
        fontSize: '12px'
    },
    button: {
        backgroundColor: '#56E39F',
        fontFamily: '"Roboto", sans-serif',
        fontSize: '12px',
        borderStyle: 'none',
        borderRadius: '12px',
        width: '70px',
        margin: '5px',
        padding: '5px',
        "&:hover": {backgroundColor: '#84EBB9'}

    },
})



function RowItem({ card, setEditCard }) {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()


    let dateCreated = Date.parse(card.created_at)
    let sendDate = Date.parse(card.schedule_send)

    dateCreated = new Intl.DateTimeFormat('en-US').format(dateCreated)
    sendDate = new Intl.DateTimeFormat('en-US').format(sendDate)

    function handleDelete(){
        fetch(`/user_cards/${card.id}`, {
            method: 'DELETE',
            headers: { Accept: 'application/json'}
        }).then(dispatch(deleteMyCard(card)))
    }

    function handleEditClick(){
        setEditCard(card)
        history.push('/editcard')
    }

    return (
        <TableRow>
            <TableCell><img className={classes.prevImage} src={card.template.art_url}/></TableCell>
            <TableCell className={classes.text}>{card.is_sent ? "sent" : "not sent"}</TableCell>
            <TableCell className={classes.text}>{dateCreated}</TableCell>
            <TableCell className={classes.text}>{sendDate}</TableCell>
            <TableCell className={classes.text}>{card.recipient_name}</TableCell>
            <TableCell>
                { !card.is_sent ? 
                    <>
                    <button className={classes.button} onClick={handleEditClick}>edit</button>
                    <button className={classes.button}
                    onClick={handleDelete}>delete</button>
                    </>
                    :
                    null
                }

            </TableCell>
        </TableRow>
    )
}

export default RowItem

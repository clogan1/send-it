import { useHistory } from 'react-router-dom'
import {
    makeStyles,
    TableCell,
    TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
import { grey } from '@material-ui/core/colors';

import { useDispatch } from "react-redux";
import { deleteMyCard, editMyCard } from '../../Redux/Actions/index'


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
    buttonSpace: {
        marginRight: '10px'
    }
})



function RowItem({ card, setEditCard }) {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()


    let dateCreated = Date.parse(card.created_at)
    let sendDate = (card.schedule_send) ? Date.parse(card.schedule_send) : null
   

    dateCreated = new Intl.DateTimeFormat('en-US').format(dateCreated)
    sendDate = (sendDate) ? new Intl.DateTimeFormat('en-US').format(sendDate) : null

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

    function handleSendClick(){
        console.log("Send it!")
        const t = new Date(Date.now()).toISOString()
        const updatedUserCard = {
            is_sent: true,
            schedule_send: t
        }
        fetch(`/sendcard/${card.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUserCard)
        }).then(res => {
            if(res.ok){
                res.json().then(card => {
                    dispatch(editMyCard(card))
                })
            }
        })
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
                    {/* <button className={classes.button} onClick={handleSendClick}>send it</button> */}
                    <span title="send card"> 
                    <IconButton className={classes.buttonSpace} onClick={handleSendClick}>
                        <SendIcon fontSize="small" style={{ color: '#56E39F' }}/>
                    </IconButton>
                    </span>
                    <span title="edit card"> 
                    <IconButton onClick={handleEditClick} className={classes.buttonSpace}>
                        <EditIcon fontSize="small" style={{ color: grey[800] }}/>
                    </IconButton>
                    </span>
                    {/* <button className={classes.button} onClick={handleEditClick}>edit</button> */}
                    <span title="delete card"> 
                    <IconButton onClick={handleDelete} className={classes.buttonSpace}>
                       <DeleteIcon fontSize="small" style={{ color: grey[800] }}/>
                    </IconButton>
                    </span>
                    {/* <button className={classes.button}
                    onClick={handleDelete}>delete</button> */}
                    </>
                    :
                    null
                }

            </TableCell>
        </TableRow>
    )
}

export default RowItem

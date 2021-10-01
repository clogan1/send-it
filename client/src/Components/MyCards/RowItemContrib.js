import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
        cursor: 'pointer',
        "&:hover": {backgroundColor: '#84EBB9'}

    },
    buttonSpace: {
        marginRight: '10px'
    }
})



function RowItemContrib({ card, contrib, setEditCard, setEditContrib}) {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const [imgUrl, setImgUrl] = useState('')

    useEffect(()=> {
        fetch(`/templates/${card.template_id}`)
        .then(res => res.json())
        .then(temp => setImgUrl(temp.art_url))

    }, [])


    let dateCreated = Date.parse(card.created_at)
    let sendDate = (card.schedule_send) ? Date.parse(card.schedule_send) : null
   

    dateCreated = new Intl.DateTimeFormat('en-US').format(dateCreated)
    sendDate = (sendDate) ? new Intl.DateTimeFormat('en-US').format(sendDate) : null

    function handleEditClick(){
        setEditCard(card)
        setEditContrib(contrib)
        history.push('/editcontributor')
    }


    return (
        <TableRow>
            <TableCell><img className={classes.prevImage} src={imgUrl} /></TableCell>
            <TableCell className={classes.text}>{card.is_sent ? "sent" : "not sent"}</TableCell>
            <TableCell className={classes.text}>{dateCreated}</TableCell>
            <TableCell className={classes.text}>{sendDate}</TableCell>
            <TableCell className={classes.text}>{card.recipient_name}</TableCell>
            <TableCell>
                { !card.is_sent ? 
                    <>
                    <span title="edit card"> 
                    <IconButton className={classes.buttonSpace} onClick={handleEditClick}>
                        <EditIcon fontSize="small" style={{ color: grey[800] }}/>
                    </IconButton>
                    </span>
                    </>
                    :
                    null
                }
            </TableCell>
        </TableRow>
    )
}

export default RowItemContrib

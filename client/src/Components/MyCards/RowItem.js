import { useHistory } from 'react-router-dom';
import { useState } from 'react'
import {
    makeStyles,
    TableCell,
    TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { grey } from '@material-ui/core/colors';

import { useDispatch } from "react-redux";
import { deleteMyCard, editMyCard, updateContribList } from '../../Redux/Actions/index'
import InviteContributorsModal from '../InviteContributorsModal';

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
    },
    mobileHide: {
        '@media (max-width:780px)': {
            display: 'none'
        },
        fontWeight: '500',
        fontSize: '12px'
    },
    fadeIn: {
        opacity: '1',
        transition: 'width 0.5s, height 0.5s, opacity 0.5s 0.5s'
    }
})



function RowItem({ card, setEditCard }) {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const[openContributorModal, setOpenContributorModal] = useState(false)

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


    function handleInviteOthers(){
        setOpenContributorModal(true)
    }

    function addContrib(contrib){
        dispatch(updateContribList(contrib))
        console.log("contrib")
    }

    function handleSendClick(){
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
        <TableRow className={classes.fadeIn}>
            <TableCell><img className={classes.prevImage} src={card.template.art_url} alt={card.id}/></TableCell>
            <TableCell className={classes.text}>{card.is_sent ? "sent" : "not sent"}</TableCell>
            <TableCell className={classes.mobileHide}>{dateCreated}</TableCell>
            <TableCell className={classes.mobileHide}>{sendDate}</TableCell>
            <TableCell className={classes.text}>{card.recipient_name}</TableCell>
            <TableCell>
                { !card.is_sent ? 
                    <>
                    <Tooltip title="send card"> 
                    <IconButton className={classes.buttonSpace} onClick={handleSendClick}>
                        <SendIcon fontSize="small" style={{ color: '#56E39F' }}/>
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="edit card"> 
                    <IconButton onClick={handleEditClick} className={classes.buttonSpace}>
                        <EditIcon fontSize="small" style={{ color: grey[800] }}/>
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="invite others to sign"> 
                    <IconButton onClick={handleInviteOthers} className={classes.buttonSpace}>
                        <SupervisorAccountIcon fontSize="small" style={{ color: grey[800] }}/>
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="delete card"> 
                    <IconButton onClick={handleDelete} className={classes.buttonSpace}>
                       <DeleteIcon fontSize="small" style={{ color: grey[800] }}/>
                    </IconButton>
                    </Tooltip>
                    </>
                    :
                    null
                }

            </TableCell>
            <InviteContributorsModal 
            openContributorModal={openContributorModal}
            setOpenContributorModal={setOpenContributorModal}
            cardId={card.id}
            addContrib={addContrib}
            />
        </TableRow>
    )
}

export default RowItem

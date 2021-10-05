import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Typography,
    makeStyles,
    Grid,

} from '@material-ui/core';
import { useDispatch } from "react-redux";
import { editMyCard } from '../../Redux/Actions/index';
import InviteContributorsModal from '../InviteContributorsModal'
import MobileAlert from '../MobileAlert';
import FadeIn from 'react-fade-in';

const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        height: '100%',
        flexGrow: 1,
    },
    previewContainer : {
        minWidth: '300px'
    },
    editContainer : {
        height: '100vh',
    },
    box: {
        padding: '30px 60px',
        // backgroundColor: 'pink'

    },
    header: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '10px'
    },
    prevBox: {
        // backgroundColor: 'blue',
    },
    image: {
        width: '300px',
        float: 'left',
        marginRight: '10px',
        marginBottom: '20px'

    },
    card: {
        backgroundColor: 'white',
        width: '280px',
        justifyContent: 'center',
        padding: '10px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        minHeight: '400px',
        float: 'left'

    },
    formItems : {
        marginTop: '10px',
        marginBottom: '10px',
        backgroundColor: '#F3F2F2',
        borderRadius: '6px',
        borderStyle: 'none',
        width: '80%',
        height: '40px'
      },
      message: {
        marginTop: '10px',
        marginBottom: '10px',
        backgroundColor: '#F3F2F2',
        borderRadius: '6px',
        borderStyle: 'none',
        width: '80%',
        height: '300px',
        fontFamily: '"Roboto", sans-serif',
        padding: '5px'

      },
      formDiv: {
          marginTop: '20px',
          backgroundColor: 'white',
          padding: '20px',
        //   justifyContent: 'center,',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          borderRadius: '6px',
          minWidth: '270px'
      },
      labels: {
        textAlign: 'left'
      },
      errorItem: {
        marginTop: '20px',
        marginBottom: '20px',
      },
      button: {
        backgroundColor: '#56E39F',
        fontSize: '14px',
        width: '150px',
        borderStyle: 'none',
        height: '30px',
        borderRadius: '12px',
        marginTop: '10px',
        marginRight: '30px',
        "&:hover": {backgroundColor: '#84EBB9'},
        cursor: 'pointer',
        fontFamily: '"Roboto", sans-serif'
    },
    backbutton: {
        backgroundColor: '#CCCCCC',
        fontFamily: '"Roboto", sans-serif',
        fontSize: '14px',
        width: '150px',
        borderStyle: 'none',
        height: '30px',
        borderRadius: '12px',
        marginTop: '10px',
        marginRight: '30px',
        "&:hover": {backgroundColor: '#84EBB9'},
        cursor: 'pointer',
    },
    smallHeader: {
        color: '#56E39F',
        fontSize: '12px',
        marginBottom: '5px',
    },
    contribBullet: {
        fontSize: '12px'
    }

})

function EditCardPage( { editCard }) {
    const classes = useStyles()
    const [recipientName, setRecipientName]= useState('')
    const [recipientEmail, setRecipientEmail] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState([])
    const[openContributorModal, setOpenContributorModal] = useState(false)
    const [contributors, setContributors] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()


    if(!editCard){
        history.push('/')
    }


    useEffect(()=> {
        setRecipientName(editCard.recipient_name)
        setRecipientEmail(editCard.recipient_email)
        setMessage(editCard.message)
        setContributors(editCard.contributors)
    }, [])

    function handleCancel(){
        history.push('/mycards')
    }

    function handleContributorClick(e){
        e.preventDefault()
        setOpenContributorModal(true)
    }

    function addContrib(contrib){
        setContributors([...contributors, contrib])
    }


    function handleSubmit(e){
        e.preventDefault()

        const updatedUserCard = {
            recipient_name: recipientName,
            recipient_email: recipientEmail,
            message: message
        }

        fetch(`/user_cards/${editCard.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUserCard)
        }).then(res => {
            if(res.ok){
                res.json().then(card => {
                    dispatch(editMyCard(card))
                    history.push('/mycards')
                })
            }
            else {
                res.json().then(err => setErrors(err.errors))
            }
        })
        
    }

    return (
        <FadeIn>
        <Box className={classes.container}>
             <MobileAlert />
        <Grid container spacing={3}>
            <Grid item xs={6} className={classes.previewContainer}>
                <Box className={classes.box}>
                <Typography className={classes.header}>preview</Typography>
                <Grid item xs={12} className={classes.prevBox}>
                    { editCard ? <img src={editCard.template.art_url} className={classes.image} alt={editCard.name}/> : null }
                    <Box className={classes.card}>
                        <Typography className={classes.smallHeader}>my message:</Typography>
                        {message}
                        <br></br>
                        <br></br>
                        <Typography className={classes.smallHeader}>other contributors:</Typography>
                            {contributors.map(contrib => {
                               return (<p key={contrib.id}>{contrib.message}</p>)
                            })
                            }
                    </Box>
                </Grid>
                </Box>
            </Grid>
            <Grid item xs={6} className={classes.editContainer}>
            <Box className={classes.box}>
                <Typography className={classes.header}>edit</Typography>
                <Box className={classes.formDiv}>
                    <form autoComplete="off" onSubmit={handleSubmit} >
                            <Typography className={classes.labels}>recipient name:</Typography>
                                <input 
                                type="text"
                                id="recipientName"
                                value={recipientName}
                                onChange={(e) => setRecipientName(e.target.value)}
                                className={classes.formItems}
                                />
                            <br></br>
                            <Typography className={classes.labels}>recipient email:</Typography>
                                <input 
                                type="text"
                                id="recipientEmail"
                                value={recipientEmail}
                                onChange={(e) => setRecipientEmail(e.target.value)}
                                className={classes.formItems}
                                />
                            <br></br>
                            <Typography className={classes.labels}>message:</Typography>
                                <textarea 
                                type="text"
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className={classes.message}
                                />
                            <br></br>
                            <Typography className={classes.labels}>other contributors:</Typography>
                            <ul>
                                {(contributors.length > 0) ? 
                                (contributors.map(contrib => {
                                    return (<li key={contrib.id} className={classes.contribBullet}>{contrib.email}</li>)
                                })
                                )
                                    :
                                    null
                                }
                            </ul>
                            <br></br>
                            <button type="submit" className={classes.button}>save changes</button>
                            <button onClick={handleContributorClick} className={classes.button}>invite others</button>
                            <button onClick={handleCancel} className={classes.backbutton}>back</button>
                        </form>
                        <Box className={classes.errorItem} >
                            {(errors.length > 0) ? 
                                (
                                    <>
                                        {errors.map(err => (
                                            <Typography key={err} color="error">{err}</Typography>
                                        ))
                                        }
                                    </>
                                )
                                :
                                null
                                }
                        </Box>
                    </Box>
            </Box>
            </Grid>

        </Grid>
        <InviteContributorsModal 
            openContributorModal={openContributorModal}
            setOpenContributorModal={setOpenContributorModal}
            cardId={editCard.id}
            addContrib={addContrib}
        />
    </Box>
    </FadeIn>

    )
}

export default EditCardPage

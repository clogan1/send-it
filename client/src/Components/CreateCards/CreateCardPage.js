import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Typography,
    makeStyles,
    Grid,

} from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux";
import { addMyCard } from '../../Redux/Actions/index'


const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        height: '100%',
        flexGrow: 1,
    },
    previewContainer : {
        height: '100vh',
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
        marginRight: '10px'

    },
    card: {
        backgroundColor: 'white',
        width: '300px',
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
        width: '500px',
        height: '40px'
      },
      message: {
        marginTop: '10px',
        marginBottom: '10px',
        backgroundColor: '#F3F2F2',
        borderRadius: '6px',
        borderStyle: 'none',
        width: '500px',
        height: '300px'

      },
      formDiv: {
          marginTop: '20px',
          backgroundColor: 'white',
          padding: '20px',
        //   justifyContent: 'center,',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          borderRadius: '6px',
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
        fontFamily: '"Roboto", sans-serif',
        fontSize: '14px',
        width: '200px',
        borderStyle: 'none',
        height: '30px',
        borderRadius: '12px',
        marginTop: '10px'
    }

})

function CreateCardPage( { editTemplate }) {
    const classes = useStyles()
    const [recipientName, setRecipientName]= useState('')
    const [recipientEmail, setRecipientEmail] = useState('')
    const [message, setMessage] = useState('')
    // const [scheduleSend, setScheduleSend] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch()



    function handleSubmit(e){
        e.preventDefault()

        const newUserCard = {
            user_id: user.id,
            template_id: editTemplate.id,
            recipient_name: recipientName,
            recipient_email: recipientEmail,
            message: message,
            is_sent: false,
            // schedule_send: scheduleSend
        }

        fetch('/user_cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserCard)
        }).then(res => {
            if(res.ok){
                res.json().then(card => {
                    // console.log(card)
                    //handleAddMyCard(card)
                    dispatch(addMyCard(card))
                    history.push('/mycards')
                })
            }
            else {
                res.json().then(err => setErrors(err.errors))
            }
        })
        
    }

    return (

        <Box className={classes.container}>
        <Grid container spacing={3}>
            <Grid item xs={6} className={classes.previewContainer}>
                <Box className={classes.box}>
                <Typography className={classes.header}>preview</Typography>
                <Grid item xs={12} className={classes.prevBox}>
                    <img src={editTemplate.art_url} className={classes.image}/>
                {/* </Grid> */}
                {/* <Grid item xs={6} className={classes.prevBox}> */}
                    <Box className={classes.card}>
                        {message}
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
                                <input 
                                type="text"
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className={classes.message}
                                />
                            <br></br>
                            {/* <Typography className={classes.labels}>schedule send:</Typography>
                                <input 
                                type="datetime-local"
                                id="scheduleSend"
                                value={scheduleSend}
                                onChange={(e) => setScheduleSend(e.target.value)}
                                className={classes.formItems}
                                />
                            <br></br> */}
                            <br></br>
                            <button type="submit" className={classes.button}>create card</button>
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
    </Box>

    )
}

export default CreateCardPage

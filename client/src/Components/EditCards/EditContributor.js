import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Typography,
    makeStyles,
    Grid,

} from '@material-ui/core';
import { useDispatch } from "react-redux";
import { editMyContributors } from '../../Redux/Actions/index'
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
    },
    helper: {
        fontSize: '12px',
        fontStyle: 'italic',
        color: "#A3A3A3"
    }
})

function EditContributor( { editCard, editContrib }) {
    const classes = useStyles()
    const [myMessage, setMyMessage] = useState('')
    const [card, setCard] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()


    if(!editCard){
        history.push('/')
    }

    useEffect(()=> {
        fetch(`/user_cards/${editCard.id}`)
        .then(res => res.json())
        .then(card => setCard(card))

        setMyMessage(editContrib.message)

    }, [])

    const displayOthers = card ? card.contributors.filter(contrib => contrib.id !== editContrib.id) : []


    function handleCancel(){
        history.push('/cards')
    }


    function handleSubmit(e){
        e.preventDefault()

        fetch(`/contributors/${editContrib.id}`, { 
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                message: myMessage
            })
            }).then(res => {
                if(res.ok){
                    res.json().then(contrib => {
                        dispatch(editMyContributors(contrib))
                        history.push('/cards')
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
                    { card ? <img src={card.template.art_url} className={classes.image} alt={card.name}/> : null }
                    <Box className={classes.card}>
                        <Typography className={classes.smallHeader}>message:</Typography>
                        {card.message}
                        <br></br>
                        <br></br>
                        <Typography className={classes.smallHeader}>my message:</Typography>
                        {myMessage}
                        <br></br>
                        <br></br>
                        {(displayOthers.length > 0) ?
                            <>
                            <Typography className={classes.smallHeader}>other contributors:</Typography>
                            {displayOthers.map(contrib => {
                               return (<p key={contrib.id}>{contrib.message}</p>)
                            })
                            }
                            </>
                            :
                            null
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
                            <Typography className={classes.labels}>message:</Typography>
                            <Typography className={classes.helper}>top tip: include your name at the end of your message</Typography>
                                <textarea 
                                type="text"
                                id="mymessage"
                                value={myMessage}
                                onChange={(e) => setMyMessage(e.target.value)}
                                className={classes.message}
                                />
                            <br></br>
                            <br></br>
                            <button type="submit" className={classes.button}>save changes</button>
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
    </Box>
    </FadeIn>

    )
}

export default EditContributor

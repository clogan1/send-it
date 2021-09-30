import { useState, useEffect } from 'react';
import { 
    makeStyles,
    Modal,
    Box,
    Typography,
    Backdrop,
    Fade,
    IconButton,
    Container
 } from '@material-ui/core';
 import CloseIcon from '@material-ui/icons/Close';


 const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
        backgroundColor: 'white',
        // border: '2px solid #000',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        padding: '20px',
        textAlign: 'center',
        height: '400px',
        borderRadius: '10px',
        width: '400px'
    },
    exitButton: {
        float: 'right',
        marginTop: '10px',
        color: 'black',
        marginLeft: '80%'
    },
    text : {
        fontFamily: '"Roboto", sans-serif',
        marginTop: '5px'

    },
    link :{
        textDecoration: 'underline',
        "&:hover": {fontWeight: '600'},
    },
    formDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '0 auto',
        // backgroundColor: 'pink',
        // height: '250px',
        // padding: '20px'
      },
      formItems : {
        marginTop: '10px',
        marginBottom: '10px',
        backgroundColor: '#F3F2F2',
        borderStyle: 'none',
        width: '300px',
        height: '40px'
      },
      labels: {
        textAlign: 'left',
        fontFamily: '"Roboto", sans-serif',
      },
      errorItem: {
        marginTop: '20px',
        marginBottom: '20px',
        minheight: '100px'
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
        "&:hover": {backgroundColor: '#84EBB9'},
        cursor: 'pointer',
    },
    heading: {
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'left',

    },
    note: {
        fontSize: '12px',
        fontStyle: 'italic',
        textAlign: 'left',
        marginBottom: '20px'

    },
    added: {
        color: '#56E39F',
        fontSize: '12px',
        textAlign: 'left',
    }
 })



function InviteContributorsModal( { setOpenContributorModal, openContributorModal, cardId, addContrib}) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([])
    const [isAdded, setIsAdded] = useState(false)

    function handleClose(){
        setOpenContributorModal(false)
    }

    useEffect(()=> {
        setEmail('')
        setErrors([])
        setIsAdded(false)

    }, [openContributorModal])

    function handleSubmit(e){
        e.preventDefault()
        setErrors([])
        setIsAdded(false)

        const newContrib = {
            user_card_id: cardId,
            email: email,
            message: ""
        }

        fetch('/contributors', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newContrib)
        }).then(res => {
            if(res.ok){
                res.json().then(contrib => {
                    if(contrib.errors){
                        setErrors(contrib.errors)
                    }
                    else {
                        setIsAdded(true)
                        addContrib(contrib)
                    }
                })
            }
            else {
                res.json().then(err => setErrors(err.errors))
            }
        })
        setEmail('')
        setErrors([])
        setIsAdded(false)
    }


    return (
        <Modal
            className={classes.modal} 
            open={openContributorModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                }}
        >
            <Fade
                in={openContributorModal}
            >
            <div className={classes.paper}>
                <IconButton
                    className={classes.exitButton}
                    onClick={handleClose}
                    >
                    <CloseIcon />
                </IconButton>
                <Container className={classes.formDiv}>
                    <form onSubmit={handleSubmit} autoComplete="off">
                    <Typography className={classes.heading}>invite others to sign the card </Typography>
                    <Typography className={classes.note}>note: must be current Send It users </Typography>
                    <Typography className={classes.labels}>email:</Typography>
                        <input 
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={classes.formItems}
                        />
                        {isAdded ? <p className={classes.added}>added</p> : <p className={classes.added} ></p>}
                        <br></br>       
                        <br></br>
                        <button type="submit" className={classes.button}>add</button>
                        </form>
                <Box className={classes.errorItem} >
                    {(errors.length > 0) ? 
                        (<>
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
            </Container>
            </div>

            </Fade>
     
        </Modal>
    )
}

export default InviteContributorsModal

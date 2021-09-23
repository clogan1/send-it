import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useState } from 'react';
import { 
    makeStyles,
    Modal,
    Box,
    Typography,
    Backdrop,
    Fade,
    IconButton,
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
        height: '600px',
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
    }
 })

function FormModal({ openModal, setOpenModal, setUser }) {
    const classes = useStyles();
    const [login, setLogin] = useState(true)

    function handleClose(){
        setOpenModal(false)
    }

    function handleFormToggle(){
        setLogin(!login)
    }

    return (
        <Modal
            className={classes.modal} 
            open={openModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                }}
        >
            <Fade
                in={openModal}
            >
            <div className={classes.paper}>
                <IconButton
                    className={classes.exitButton}
                    onClick={handleClose}
                    >
                    <CloseIcon />
                </IconButton>
                {login ?
                    <LoginForm setUser={setUser} setOpenModal={setOpenModal}/>
                    :
                    <SignupForm setUser={setUser} setOpenModal={setOpenModal}/>
                }
                { login ?
                    <Typography className={classes.text}>are you new?  &nbsp;  
                        <span 
                            className={classes.link}
                            onClick={handleFormToggle}>
                            sign up</span>
                    </Typography>
                    :
                    <Typography className={classes.text}>
                        already a member?  &nbsp; 
                        <span className={classes.link} 
                            onClick={handleFormToggle}>
                           login
                        </span>
                    </Typography>
                }
            </div>

            </Fade>
     
        </Modal>
    )
}

export default FormModal

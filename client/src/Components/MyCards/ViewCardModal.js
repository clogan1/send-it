import { 
    makeStyles,
    Modal,
    Box,
    Typography,
    Grid,
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
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        padding: '30px',
        textAlign: 'center',
        // height: '600px',
        borderRadius: '10px',
        width: '600px'
    },
    exitButton: {
        float: 'right',
        marginTop: '10px',
        color: 'black',
        marginLeft: '80%'
    },
    text : {
        fontFamily: '"Roboto", sans-serif',
        padding: '10px',
        textAlign: 'left',
        '@media (max-width:780px)': {
            fontSize: '10px'
        },

    },
    img: {
        width: '250px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        float: 'left',
        '@media (max-width:780px)': {
            width: '150px'
        },
    },
    box: {
        width: '250px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', 
        minHeight: '100%',
        float: 'left',
        '@media (max-width:780px)': {
            width: '150px'
        },
    },
    container: {
        marginBottom: '20px'
    }
  
 })

function ViewCardModal({ card, openViewModal, setOpenViewModal }) {
    const classes = useStyles();


    function handleClose(){
        setOpenViewModal(false)
    }

    let sendDate = (card.schedule_send) ? Date.parse(card.schedule_send) : null
    sendDate = (sendDate) ? new Intl.DateTimeFormat('en-US').format(sendDate) : null

    if(card)return (
        <Modal
        className={classes.modal} 
        open={openViewModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
            }}
        >
        <Fade
            in={openViewModal}
        >
        <div className={classes.paper}>
            <IconButton
                className={classes.exitButton}
                onClick={handleClose}
                >
                <CloseIcon />
            </IconButton>
            <Grid container spacing={1} 
            className={classes.container}>
                <Grid item xs={6}>
                    <img  src={card.template.art_url} alt={card.id} className={classes.img}/>
                </Grid>
                <Grid item xs={6}>
                    <Box className={classes.box}>
                        <Typography className={classes.text} >
                            {card.message}
                        </Typography>
                        {card.contributors.map(contrib => {
                               return (<Typography key={contrib.id} className={classes.text}>{contrib.message}</Typography>)
                            })
                        }
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography className={classes.text} >
                        <strong>date sent:</strong>
                        <br></br>
                        {sendDate}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.text} >
                        <strong>recipient:</strong>
                        <br></br>
                        {card.recipient_name} ({card.recipient_email})
                    </Typography>
                </Grid>
            </Grid>
        </div>
        </Fade>
        </Modal>
   
    )
}

export default ViewCardModal

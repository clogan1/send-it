import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Container,
    Typography,
    makeStyles,
    Grid,
    Modal,
    Backdrop,
    Fade
} from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from '../../Redux/Actions/index'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { grey } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        // height: '100vh',
        flexGrow: 1,
        justifyContent: 'center',
        // textAlign: 'center',
        paddingTop: '10px'
    },
        header: {
            fontSize: '24px',
            fontWeight: '500',
            marginBottom: '10px',        
    },
        headerText: {
            color: 'black',
            fontWeight: '600',
            fontSize: '14px'
        },
        image: {
            width: '150px',
            borderRadius: '50%',
            backgroundColor: 'white',
            "&:hover": {cursor: 'pointer'},

        },
        formItems : {
            marginTop: '5px',
            marginBottom: '5px',
            backgroundColor: 'white',
            borderStyle: 'none',
            width: '300px',
            height: '30px'
        },
        gridContainer: {
            marginTop: '30px',
        },
        button: {
            backgroundColor: '#56E39F',
            fontFamily: '"Roboto", sans-serif',
            fontSize: '14px',
            width: '70px',
            borderStyle: 'none',
            height: '30px',
            borderRadius: '12px',
            marginTop: '10px',
            marginRight: '30px',
            "&:hover": {backgroundColor: '#84EBB9'},
            cursor: 'pointer',
        },
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
            height: '200px',
            borderRadius: '10px',
            width: '400px'
        },
        exitButton: {
            float: 'right',
            marginTop: '10px',
            color: 'black',
            marginLeft: '80%'
        },
        formDiv: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '0 auto',
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
          formModal : {
            marginTop: '5px',
            marginBottom: '5px',
            backgroundColor: '#F3F2F2',
            borderStyle: 'none',
            width: '300px',
            height: '30px'
        },

    })


function ProfilePage( {  }) {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [editUsername, toggleEditUsername] = useState(false)
    const [editEmail, toggleEditEmail] = useState(false)
    const [errors, setErrors] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.user);

    if(!user){
        history.push('/')
    }


    useEffect(() => {
        if(user){
            setUsername(user.username)
            setEmail(user.email)
            setAvatar(user.avatar_url)
        }
    }, [])

    function handleClose(){
        setOpenModal(false)
    }

    function handleOpenModal(){
        setOpenModal(true)
    }

    function handleSubmit(e){
        e.preventDefault()

        const updatedProfile = {
            username: username,
            email: email,
            avatar_url: avatar
        }

        fetch(`/users/${user.id}`, { 
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProfile)
        }).then(res => {
            if(res.ok){
                res.json().then(updateduser => {
                    setOpenModal(false)
                    toggleEditUsername(false)
                    toggleEditEmail(false)
                    dispatch(updateUser(updateduser))
                    setUsername(updateduser.username)
                    setEmail(updateduser.email)
                    setAvatar(updateduser.avatar_url)
                    setErrors([])
                })
            }
            else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }


    if(user) return (
            <Box className={classes.container}>
            <Container >
            <Typography className={classes.header}><strong>my profile</strong></Typography>
            <Grid container spacing={3} className={classes.gridContainer}>
                <Grid item xs={3}>
                    <img src={avatar ? user.avatar_url : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} alt={user.username} className={classes.image} onClick={handleOpenModal}/>
                </Grid>
                <Grid item xs={9}>
                    { !editUsername ? 
                        <>
                        <p>{user.username} </p>
                        <IconButton onClick={() => toggleEditUsername(true)}>
                            <EditIcon fontSize="small" style={{ color: grey[800] }}/>
                        </IconButton>
                        </>
                        : 
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <input 
                                type="text"
                                id="username"
                                value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={classes.formItems}/> 
                            <button type="submit" className={classes.button}>save</button>
                        </form>
                    }

                    { !editEmail ? 
                        <>
                        <p>{user.email} </p>
                        <IconButton onClick={() => toggleEditEmail(true)}>
                            <EditIcon fontSize="small" style={{ color: grey[800] }}/>
                        </IconButton>
                        </>
                        : 
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <input 
                                type="text"
                                id="email"
                                value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={classes.formItems}/> 
                            <button type="submit" className={classes.button}>save</button>
                        </form>
                    }
             
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
                </Grid>
            </Grid>
            </Container>
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
                        <Container className={classes.formDiv}>
                        <form onSubmit={handleSubmit} autoComplete="off">
                                <Typography className={classes.labels}>avatar url:</Typography>
                                    <input 
                                    type="text"
                                    id="avatarUrl"
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    className={classes.formModal}
                                    />
                                    <br></br>       
                                    <br></br>
                                    <button type="submit" className={classes.button}>save</button>
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
            </Box>
    )
}

export default ProfilePage

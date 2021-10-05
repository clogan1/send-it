import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Container,
    Typography,
    makeStyles,
    Grid,
} from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from '../../Redux/Actions/index'



const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        flexGrow: 1,
        justifyContent: 'center',
        paddingTop: '10px'
    },
        header: {
            fontSize: '24px',
            fontWeight: '500',
            marginBottom: '20px', 
            '@media (max-width:780px)': {
                fontSize: '20px',
            }       
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
            margin: '30px'
        },
        formItems : {
            marginTop: '5px',
            marginBottom: '5px',
            backgroundColor: 'white',
            borderStyle: 'none',
            width: '300px',
            height: '30px',
            marginRight: '20px'
        },
        button: {
            backgroundColor: '#56E39F',
            fontFamily: '"Roboto", sans-serif',
            fontSize: '14px',
            width: '120px',
            borderStyle: 'none',
            height: '30px',
            borderRadius: '12px',
            marginTop: '10px',
            marginRight: '30px',
            "&:hover": {backgroundColor: '#84EBB9'},
            cursor: 'pointer',
        },
        formDiv: {
            height: '100%',
            float: 'left',
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
          imgGrid: {
              midWidth: '200px',
          }
    })


function ProfilePage() {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [errors, setErrors] = useState([])
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
                <Grid container spacing={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                className={classes.gridContainer}>
                    <Grid item  className={classes.imgGrid}>
                        <img src={avatar ? user.avatar_url : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} alt={user.username} className={classes.image}/>
                    </Grid>
                    <Grid item  className={classes.formDiv}>
                        <Container>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <Typography className={classes.labels}>username:</Typography>
                                <input 
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={classes.formItems}/> 
                            <br></br> 
                            <br></br> 
                            <Typography className={classes.labels}>email:</Typography>
                                <input 
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={classes.formItems}/>
                            <br></br> 
                            <br></br> 
                            <Typography className={classes.labels}>avatar URL:</Typography>
                                <input 
                                    type="text"
                                    id="avatarUrl"
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    className={classes.formItems}
                                    />
                            <br></br> 
                            <br></br> 
                            <button type="submit" className={classes.button}>save changes</button>
                            <br></br> 
                            <br></br> 
                        </form>             
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
                        </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
    )
}

export default ProfilePage

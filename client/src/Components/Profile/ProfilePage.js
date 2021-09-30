import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Container,
    Typography,
    makeStyles,
    Grid
} from '@material-ui/core';
import { useSelector } from "react-redux";


const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        height: '100vh',
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
        },
        formItems : {
            marginTop: '5px',
            marginBottom: '5px',
            backgroundColor: 'white',
            borderStyle: 'none',
            width: '300px',
            height: '30px'},
        gridContainer: {
            marginTop: '30px',
        }
    })


function ProfilePage( {  }) {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [editMode, toggleEditMode] = useState(false)
    const [errors, setErrors] = useState([])
    const history = useHistory()

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
                res.json().then(user => {
                    console.log(user)
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
            <img src={user.avatar_url ? user.avatar_url : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} alt={user.username} className={classes.image}/>
            </Grid>
            <Grid item xs={9}>
                { !editMode ? 
                    <>
                    <p>{user.username} <button onClick={() => toggleEditMode(true)}>edit</button></p>
                    </>
                    : 
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <input 
                            type="text"
                            id="username"
                            value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={classes.formItems}/> 
                        <button type="submit">save</button>
                    </form>
                }
                <p>{user.email}</p>
                <p>card count: {user.count_of_user_cards}</p>
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
            </Box>
    )
}

export default ProfilePage

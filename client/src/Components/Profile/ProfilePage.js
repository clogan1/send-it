import { useState, useEffect } from 'react'
import {
    Box,
    Container,
    Typography,
    makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        height: '100vh',
        flexGrow: 1,
        justifyContent: 'center',
        textAlign: 'center',
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
            height: '30px'}
    })


function ProfilePage( { user }) {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [editMode, toggleEditMode] = useState(false)
    const [errors, setErrors] = useState([])

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
            </Container>
            <img src={user.avatar_url} alt={user.username} className={classes.image}/>
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
            </Box>
    )
}

export default ProfilePage

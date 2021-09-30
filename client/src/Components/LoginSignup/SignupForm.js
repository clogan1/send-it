import { useState, useEffect } from 'react'
import { 
    makeStyles,
    Container,
    Typography,
    Box
 } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { signUpUser } from '../../Redux/Actions/index'

 const useStyles = makeStyles({
    formDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '0 auto',
        backgroundColor: 'white',
      },
      formItems : {
        marginTop: '5px',
        marginBottom: '5px',
        backgroundColor: '#F3F2F2',
        borderStyle: 'none',
        width: '300px',
        height: '30px'
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
        marginTop: '10px',
        "&:hover": {backgroundColor: '#84EBB9'},
        cursor: 'pointer',
    }
 })

function SignupForm( { setOpenModal } ) {
    const classes = useStyles()
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()

    useEffect(()=> {
        fetch('/enduserrole')
        .then(res => res.json())
        .then(data => setRole(data.id))
    })

    function handleSubmit (e) {
        e.preventDefault();

        const newUser = {
            username: username,
            email: email,
            avatarUrl: avatarUrl,
            role_id: role,
            password: password,
            password_confirmation: confirmPassword
        }

        fetch('/signup', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(res => {
            if(res.ok){
                res.json().then(user => {
                    // setUser(user)
                    dispatch(signUpUser(user))
                    setOpenModal(false)
                })
            }
            else {
                res.json().then(err => {
                    console.log(err.errors)
                    setErrors(err.errors)
                })
            }
        })



    }

    return (
        <Container className={classes.formDiv}>
        <form onSubmit={handleSubmit} autoComplete="off">
        <Typography className={classes.labels}>username:</Typography>
            <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.formItems}
            />
        <br></br>
        <Typography className={classes.labels}>email:</Typography>
            <input 
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.formItems}
            />
        <br></br>
        <Typography className={classes.labels}>password:</Typography>
            <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.formItems}
            />
        <br></br>
        <Typography className={classes.labels}>confirm password:</Typography>
            <input 
            type="password"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={classes.formItems}
            />
        <br></br>
        <Typography className={classes.labels}>avatar url:</Typography>
            <input 
            type="text"
            id="avatarUrl"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className={classes.formItems}
            />
        <br></br>
        <br></br>
        <button type="submit" className={classes.button}>start making cards</button>
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
    </Container>
       
    )
}

export default SignupForm


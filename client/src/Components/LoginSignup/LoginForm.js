import { useState } from 'react'
import { 
    makeStyles,
    Container,
    Typography,
    Box
 } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { logInUser } from '../../Redux/Actions/index';
import FadeIn from 'react-fade-in';


 const useStyles = makeStyles({
    formDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '0 auto',
        // backgroundColor: 'pink',
        height: '250px',
        padding: '20px'
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
    }
 })

function LoginForm( { setOpenModal } ) {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()

    function handleSubmit (e) {
        e.preventDefault();

        const userLogin = {
            username: username,
            password: password
        }

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLogin)
        }).then(res => {
            if(res.ok){
                res.json().then(user => {
                    dispatch(logInUser(user))
                    setOpenModal(false)
                })
            }
            else {
                res.json().then(err => {
                    console.log(err.errors)
                    setErrors(err.errors)})
            }
        })

    }

    return (
        <FadeIn transitionDuration="200">
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
        <Typography className={classes.labels}>password:</Typography>
        <input 
         type="password"
         id="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         className={classes.formItems}
        />
        <br></br>
        <br></br>
        <button type="submit" className={classes.button}>login</button>
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
    </FadeIn>
    )
}

export default LoginForm

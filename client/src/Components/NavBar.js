import FormModal from './LoginSignup/FormModal';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react'
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    makeStyles
} from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from '../Redux/Actions/index'


const useStyles = makeStyles({
    logo: {
        fontSize: '40px',
        color: "#56E39F",
        fontFamily: "'Source Serif Pro', serif",
        // paddingLeft: '10px',
        fontWeight: '700',
        flexGrow: 1,
    },
    bar: {
        backgroundColor: 'white',
    },
    toolbarContainer: {
        Height: '56px',
        padding: '12px 20px'
    },
    logoBox: {
        // marginRight: '53%'
        width: '70%'
    },
    boxText: {
        fontSize: '20px',
        textDecoration: 'none',
        color: 'black',
        "&:hover": {fontWeight: '600'},
        textAlign: 'center'
    },
    activeText: {
        fontSize: '20px',
        textDecoration: 'none',
        color: 'black',
        textAlign: 'center',
        fontWeight: '600',
    },
    box: {
        // float: 'right',
        marginLeft: '10px',
        width: '140px',
        textAlign: 'center',

    },
    activeBox : {
        borderBottom: '3px solid #56E39F',
        // float: 'right',
        marginLeft: '10px',
        width: '140px',
        textAlign: 'center',
    },
    profilepic: {
        width: '56px',
        borderRadius: '50px',
        backgroundColor: 'white',
        border: 'solid 1px black'
    },
    profileBox: {
        marginRight: '10px'
    }
})


function NavBar( {  } ) {
    const classes = useStyles()
    const location = useLocation()
    const history = useHistory()
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch()
    const userObj = useSelector((state) => state.user.user);
    // console.log("from nav:", userObj)

    function signoutUser(){
        fetch('/logout', {
          method: 'DELETE'
        }).then((r) => {
          if(r.ok){
            // setUser(null)
            dispatch(logOutUser())
            history.push('/')
          }})
      }

    function handleOpenLogin(){
        setOpenModal(true)
    }

    function profileNav(){
        history.push('/myprofile')
    }

    return (
        <AppBar 
            position="sticky" 
            elevation={0}
            className={classes.bar}
        >
        <Toolbar className={classes.toolbarContainer}>
            <Box className={classes.logoBox}>
                <Typography className={classes.logo}>Send It</Typography>
            </Box>
            <Box className={location.pathname === "/" ? classes.activeBox : classes.box}>
                <Typography
                    component={NavLink}
                    to="/"
                    className={location.pathname === "/" ? classes.activeText : classes.boxText}
                >
                    browse cards
                </Typography>
            </Box>
            { userObj ? 
                <>
                <Box className={location.pathname === "/mycards" ? classes.activeBox : classes.box}>
                    <Typography
                        component={NavLink}
                        to="/mycards"
                        className={location.pathname === "/mycards" ? classes.activeText : classes.boxText}
                    >
                        my cards
                    </Typography>
                </Box>
                <Box className={classes.box}>
                    <Typography 
                        onClick={signoutUser}
                        className={classes.boxText}>
                        sign out
                    </Typography>
                </Box>
                <Box className={classes.profileBox}>
                    <img className={classes.profilepic} 
                    src={userObj.avatar_url ? userObj.avatar_url : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} alt={userObj.username}
                    onClick={profileNav}
                    />
                </Box>

                </>
                : 
                <>
                <Box className={classes.box}>
                    <Typography 
                        onClick={handleOpenLogin}
                        className={classes.boxText}>
                        log in
                    </Typography>
                </Box>
                </>
            }
            { openModal ?
                <FormModal openModal={openModal} setOpenModal={setOpenModal} />
                :
                null
            }
            
        </Toolbar>
        </AppBar>
    )
}

export default NavBar

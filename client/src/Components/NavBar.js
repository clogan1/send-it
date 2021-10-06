import FormModal from './LoginSignup/FormModal';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
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
        fontWeight: '700',
        flexGrow: 1,
        '@media (max-width:780px)': {
            fontSize: '32px',
        }
    },
    bar: {
        backgroundColor: 'white',
    },
    toolbarContainer: {
        Height: '56px',
        padding: '12px 20px'
    },
    logoBox: {
        width: '60%',
        '@media (max-width:780px)': {
            width: '100%',
            display: 'none'
        }
    
    },
    logoBoxMobile : {
        display: 'none%',
        '@media (max-width:780px)': {
            display: 'block',
            paddingLeft: '20px',
            paddingTop: '10px',
            marginBottom: '-20px'
        }
    },
    logoMobile: {
        display: 'none',
        
        '@media (max-width:780px)': {
            display: 'block',
            fontSize: '32px',
            color: "#56E39F",
            fontFamily: "'Source Serif Pro', serif",
            fontWeight: '700',
            flexGrow: 1,
        }
    },
    boxText: {
        fontSize: '20px',
        textDecoration: 'none',
        color: 'black',
        "&:hover": {fontWeight: '600'},
        textAlign: 'center',
        '@media (max-width:780px)': {
            fontSize: '14px',
            lineHeight: '60%'
        }
    },
    activeText: {
        fontSize: '20px',
        textDecoration: 'none',
        color: 'black',
        textAlign: 'center',
        fontWeight: '600',
        '@media (max-width:780px)': {
            fontSize: '14px',
            lineHeight: '60%'
        }
        
    },
    box: {
        marginLeft: '10px',
        width: '150px',
        textAlign: 'center',
        cursor: 'pointer',
        '@media (max-width:780px)': {
            width: '170px',
            marginLeft: '2px'
        }

    },
    activeBox : {
        borderBottom: '3px solid #56E39F',
        marginLeft: '10px',
        width: '150px',
        textAlign: 'center',
        cursor: 'pointer',
        '@media (max-width:780px)': {
            width: '170px',
            marginLeft: '2px'
        }
    },
    profilepic: {
        width: '56px',
        borderRadius: '50px',
        backgroundColor: '#CCCCCC',
        // border: 'solid 1px gray',
        cursor: 'pointer',
    },
    profileBox: {
        marginRight: '10px',
        '@media (max-width:780px)': {
            marginRight: '1px',
        }
    }
})


function NavBar( { openModal, setOpenModal } ) {
    const classes = useStyles()
    const location = useLocation()
    const history = useHistory()

    const dispatch = useDispatch()
    const userObj = useSelector((state) => state.user.user);

    function signoutUser(){
        fetch('/logout', {
          method: 'DELETE'
        }).then((r) => {
          if(r.ok){
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
            <Box className={classes.logoBoxMobile}>
                <Typography className={classes.logoMobile}>Send It</Typography>
            </Box>
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
                    browse
                </Typography>
            </Box>
            { userObj ? 
                <>
                {(userObj.role.id === 2) ? 
                            <>
                            <Box className={location.pathname === "/createtemplate" ? classes.activeBox : classes.box}>
                                <Typography
                                component={NavLink}
                                to="/createtemplate"
                                className={location.pathname === "/createtemplate" ? classes.activeText : classes.boxText}
                                >
                                add card
                                </Typography>
                                </Box>
                            </>
                        :
                        null
                }
                <Box className={location.pathname === "/cards" ? classes.activeBox : classes.box}>
                    <Typography
                        component={NavLink}
                        to="/cards"
                        className={location.pathname === "/cards" ? classes.activeText : classes.boxText}
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

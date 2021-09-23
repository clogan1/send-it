import { NavLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    makeStyles
} from '@material-ui/core'


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


function NavBar( { user, signoutUser } ) {
    const classes = useStyles()
    const location = useLocation()

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
            { user ? 
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
                    src="https://avatars.githubusercontent.com/u/77256559?v=4"/>
                </Box>

                </>
                : 
                <>
                <Box className={classes.box}>
                    <Typography 
                        className={classes.boxText}>
                        log in
                    </Typography>
                </Box>
                </>
            }
            
        </Toolbar>
        </AppBar>
    )
}

export default NavBar

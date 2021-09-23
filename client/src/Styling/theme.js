import {createTheme} from '@material-ui/core'

const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", sans-serif',
        h1: {
            fontSize: '64px',
            fontWeight: '700'
        },
        h2: {
            fontSize: '24px',
            fontWeight: '500'
        },
        h3: {
            fontSize: '18px',
            fontWeight: '500'
        },
        h4: {
            fontSize: '12px',
            color: 'black',
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontWeight: '500',
            letterSpacing: '1.5px'
        },
        h5: {
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '12px'
        },
        body1: {
            fontSize: '14px'
        },
        body2: {
            fontSize: '18px',
            fontWeight: '700'
        }
    },
    palette: {
        primary: {
            main: '#56E39F',
            light: '#A7F1CD',
            dark: '#84EBB9',
            contrastText: '#222'
        },
        secondary: {
            main: '#F3F2F2',
            light: '#FFFFFF',
            dark: "#CCCCCC",
            contrastText: '#222'
        },
        text: {
            primary: '#222'
        }
    },
    spacing: 4
})

export default theme;

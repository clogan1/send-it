import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Container,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { addTemplate } from '../../Redux/Actions/index';

const useStyles = makeStyles({
    container: {
        backgroundColor: "#F3F2F2",
        paddingTop: '20px',
        flexGrow: 1,
        },
        header: {
            fontSize: '24px',
            fontWeight: '500',
            marginBottom: '10px',
            '@media (max-width:780px)': {
                fontSize: '20px',
            }
        },
        headerText: {
            color: 'black',
            fontWeight: '600',
            fontSize: '14px'
        },
        formItems : {
            marginTop: '10px',
            marginBottom: '10px',
            backgroundColor: '#F3F2F2',
            borderRadius: '6px',
            borderStyle: 'none',
            width: '80%',
            height: '40px'
          },
          formDiv: {
              marginTop: '20px',
              backgroundColor: 'white',
              padding: '20px',
              justifyContent: 'center,',
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              borderRadius: '6px',
              width: '60%'
          },
          labels: {
            textAlign: 'left'
          },
          errorItem: {
            fontSize: '12px'
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
            marginBottom: '10px',
            "&:hover": {backgroundColor: '#84EBB9'},
            cursor: 'pointer',
        }
    })

function CreateTemplatePage( { categories }) {
    const classes = useStyles()
    const [errors, setErrors] = useState([])
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [artUrl, setArtUrl] = useState('')
    const [artistName, setArtistName] = useState('')
    const history = useHistory()

    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    if(!user){
        history.push('/')
    }   

    function handleSubmit(e) {
        e.preventDefault()

        const newTemplate = {
            category_id: parseInt(category),
            name: name,
            art_url: artUrl,
            artist_name: artistName
        }

        fetch('/templates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTemplate)
        }).then(res => {
            if(res.ok){
                res.json().then(temp => {
                    dispatch(addTemplate(temp))
                    history.push('/')
                })
            }
            else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }

    return (
        <Box className={classes.container}>
        <Container>
        <Typography className={classes.header}><strong>add card</strong></Typography>
        <Box className={classes.formDiv}>
                    <form autoComplete="off" onSubmit={handleSubmit} >
                            <Typography className={classes.labels}>category:</Typography>
                                <select 
                                id="category"
                                onChange={(e) => setCategory(e.target.value)}
                                className={classes.formItems}
                                >
                                 <option value="0">--</option>
                                 {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.emoji}&nbsp;&nbsp;{cat.name}</option>
                                    ))
                                    }
                                </select>
                            <br></br>
                            <Typography className={classes.labels}>card name:</Typography>
                                <input 
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={classes.formItems}
                                />
                            <br></br>
                            <Typography className={classes.labels}>artist name:</Typography>
                                <input 
                                type="text"
                                id="artistName"
                                value={artistName}
                                onChange={(e) => setArtistName(e.target.value)}
                                className={classes.formItems}
                                />
                            <br></br>
                            <Typography className={classes.labels}>art url:</Typography>
                                <input 
                                type="text"
                                id="artUrl"
                                value={artUrl}
                                onChange={(e) => setArtUrl(e.target.value)}
                                className={classes.formItems}
                                />
                            <br></br>
                            <br></br>
                            <button type="submit" className={classes.button}>add card</button>
                        </form>
                        <Box className={classes.errorItem} >
                            {(errors.length > 0) ? 
                                (
                                    <>
                                        {errors.map(err => (
                                            <Typography key={err} color="error"
                                            className={classes.errorItem}>{err}</Typography>
                                        ))
                                        }
                                    </>
                                )
                                :
                                null
                                }
                        </Box>
                    </Box>

        </Container>
    </Box>
    )
}

export default CreateTemplatePage
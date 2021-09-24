import {
    Box,
    Container,
    Typography,
    makeStyles,
    TableCell,
    TableRow
} from '@material-ui/core'

const useStyles = makeStyles({
    prevImage: {
        width: '50px'
    },
    text : {
        fontWeight: '500',
        fontSize: '12px'
    }
})

function RowItem({ card }) {
    const classes = useStyles()

    console.log("from row:", card)

    return (
        <TableRow>
            <TableCell><img className={classes.prevImage} src={card.template.art_url}/></TableCell>
            <TableCell className={classes.text}>{card.is_sent ? "sent" : "not sent"}</TableCell>
        </TableRow>
    )
}

export default RowItem

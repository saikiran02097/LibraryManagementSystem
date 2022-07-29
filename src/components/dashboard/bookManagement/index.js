import React, { useState } from 'react';
import { TextField, InputAdornment, Button, makeStyles, Dialog, DialogContent, DialogTitle, DialogActions, Grid } from "@material-ui/core";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Table, { StyledTableCell, StyledTableRow } from '../../table';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import "./bookManagement.scss";

const useStyles = makeStyles(theme => ({
    addBookContainer: {
        float: "right",
        marginTop: "1rem"
    },
    addBook: {
        backgroundColor: "inherit",
        textTransform: "none"
    },
    input: {
        // padding: "0.5rem"
    },
    separator: {
        padding: "0.5rem"
    }
}));

function createData(author, name, isbn, issued, stock) {
    return { isbn, name, author, issued, stock };
}

const rows = [
    createData('Frozen yoghurt', "abc", 98498, 24, 30),
    createData('Ice cream sandwich', "def", 2783156, 37, 40),
    createData('Eclair', "ghi", 2746354, 24, 30),
    createData('Cupcake', "jkl", 257465135, 67, 75),
    createData('Gingerbread', "mno", 2763385, 49, 60),
];

const columns = [
    {
        align: "left",
        title: "Book Name"
    },
    {
        align: "center",
        title: "ISBN"
    },
    {
        align: "center",
        title: "Author"
    },
    {
        align: "center",
        title: "#issued"
    },
    {
        align: "center",
        title: "Stock"
    },
    {
        align: "center",
        title: "Action(s)"
    }
]

const BookManagement = () => {
    const classes = useStyles();
    const [text, setText] = useState("");
    const [isbn, setIsbn] = useState("");
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [stock, setStock] = useState(0);
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const toggleModal = () => {
        setOpen(preVopen => !preVopen);
    };

    return (
        <div className="usercontainer">
            <TextField
                label="Book"
                placeholder="enter a book isbn"
                fullWidth
                variant="outlined"
                style={{ margin: '1rem 0' }}
                onChange={handleChange}
                value={text}
                InputProps={{ endAdornment: <InputAdornment position="end">{text ? <ClearIcon /> : ""}</InputAdornment> }}
            />
            <Table columns={columns}>
                {rows.map((row, key) => (
                    <StyledTableRow key={key}>
                        <StyledTableCell align="left">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.isbn}</StyledTableCell>
                        <StyledTableCell align="center">{row.author}</StyledTableCell>
                        <StyledTableCell align="center">{row.issued}</StyledTableCell>
                        <StyledTableCell align="center">{row.stock}</StyledTableCell>
                        <StyledTableCell align="center" >
                            <RemoveCircleIcon style={{ color: "red" }} />
                            <AddCircleIcon style={{ color: "green" }} />
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </Table>
            <div className={classes.addBookContainer}>
                <Button
                    variant="contained"
                    size="medium"
                    startIcon={<AddIcon />}
                    className={classes.addBook}
                    onClick={toggleModal}
                >
                    Book
                </Button>
            </div>
            <Dialog open={open}>
                <DialogTitle id="alert-dialog-title">{"Add a book"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={0}>
                        <Grid xs={7} className={classes.input}>
                            <TextField
                                label="Book Name"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </Grid>
                        <Grid  xs={1}></Grid>
                        <Grid xs={4} className={classes.input}>
                            <TextField
                                label="ISBN No"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setIsbn(e.target.value)}
                                value={isbn}
                            />
                        </Grid>
                        <Grid className={classes.separator} xs={12}></Grid>
                        <Grid xs={9} className={classes.input}>
                            <TextField
                                label="Author"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setAuthor(e.target.value)}
                                value={author}
                            />
                        </Grid>
                        <Grid  xs={1}></Grid>
                        <Grid xs={2} className={classes.input}>
                            <TextField
                                label="Stock"
                                variant="outlined"
                                type="number"
                                onChange={(e) => setStock(e.target.value)}
                                value={stock}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleModal} color="secondary" variant="contained">Cancel</Button>
                    <Button onClick={toggleModal} color="primary" variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default BookManagement
import React, { useState } from 'react';
import { TextField, InputAdornment, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Button } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import Table, { StyledTableCell, StyledTableRow } from '../../table';

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
        title: "Issue Date"
    },    
    {
        align: "center",
        title: "Penalty"
    },    
    {
        align: "center",
        title: "Action(s)"
    }
]

const CollectBook = () => {
    const [text, setText] = useState("");
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
                label="Student"
                placeholder="enter a student name"
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
                        <StyledTableCell align="center">
                            <Button variant='outlined' onClick={toggleModal} >Collect</Button>
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </Table>
            <Dialog
                open={open}
                onClose={toggleModal}
            >
                <DialogTitle id="alert-dialog-title">{"Do you want to collect the book?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={toggleModal} color="primary">
                        No
                    </Button>
                    <Button onClick={toggleModal} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CollectBook
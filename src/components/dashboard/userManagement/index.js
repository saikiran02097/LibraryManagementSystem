import React, { useState } from 'react';
import Table, { StyledTableCell, StyledTableRow } from '../../table';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { TextField, InputAdornment, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Button } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import "./userManagement.scss";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const columns = [
    {
        align: "left",
        title: "Student Name"
    },
    {
        align: "center",
        title: "Student Id"
    },
    {
        align: "center",
        title: "Phone Number"
    },
    {
        align: "center",
        title: "Email Id"
    },
    {
        align: "center",
        title: "Action(s)"
    }
]

const UserManagement = () => {
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
                        <StyledTableCell align="center">{row.calories}</StyledTableCell>
                        <StyledTableCell align="center">{row.fat}</StyledTableCell>
                        <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="center">
                            <DeleteForeverIcon onClick={toggleModal} />
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </Table>
            <Dialog
                open={open}
                onClose={toggleModal}
            >
                <DialogTitle id="alert-dialog-title">{"Do you want to delete the student?"}</DialogTitle>
                {/* <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent> */}
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

export default UserManagement
import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, makeStyles } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
    issueBookContainer: {
        padding: "1rem"
    },
}));


const IssueBook = () => {
    const classes = useStyles();
    const [studentId, setStudentId] = useState("");

    return (
        <Grid container className={classes.issueBookContainer}>
            <TextField
                label="Student"
                placeholder="enter a student name"
                fullWidth
                variant="outlined"
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                style={{ margin: '1rem 0' }}
                InputProps={{ endAdornment: <InputAdornment position="end">{studentId ? <ClearIcon /> : ""}</InputAdornment> }}
            />
            <Grid >
                <TextField
                    variant="outlined"
                    label="Student Id"
                />
            </Grid>
        </Grid>
    )
}

export default IssueBook
import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
  Typography,
  Button,
  Snackbar,
  makeStyles,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
import { getAPICall, postAPICall } from "../../apihandlers";
import urls from "../../apihandlers/urls";
import { Alert } from "../../helpers";
import "./userManagement.scss";

const useStyles = makeStyles((theme) => ({
  separator: {
    padding: "1.5rem",
  },
  detailsContainer: {
    border: "1px solid black",
    borderRadius: "1rem",
    padding: "1rem",
  },
  deleteButton: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem",
  },
  addBookContainer: {
    float: "right",
    marginTop: "1rem",
  },
}));

const UserManagement = () => {
  const classes = useStyles();
  const [studentID, setStudentID] = useState("");
  const [open, setOpen] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});
  const [messageData, setMessageData] = useState({ message: "", type: "" });

  const handleChange = (event) => {
    setStudentID(event.target.value);
  };

  const toggleModal = () => {
    setOpen((preVopen) => !preVopen);
  };

  const getStudentDetails = () => {
    getAPICall(`${urls.getStudentByID}/${studentID}`).then((res) => {
      setStudentDetails({
        id: 984,
        firstName: "Sam",
        middleName: "smith",
        lastName: "Roy",
        email: "ssr@GMAIL.COM",
        phoneNumber: "9848022338",
        password: "Sam@984",
      });
    });
  };

  const handleDeleteUser = () => {
    toggleModal();
    postAPICall(`${urls.disableUser}/${studentID}`, studentDetails)
      .then((res) => {
        setMessageData({
          message: `Student ${studentDetails.id} disabled Succesfully`,
          type: "success",
        });
        setOpen(false);
      })
      .catch((err) => {
        setMessageData({
          message: "unable to remove student",
          type: "error",
        });
        setOpen(false);
      });
  };

  return (
    <div className="usercontainer">
      {messageData.message && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setMessageData({ message: "" })}
        >
          <Alert
            onClose={() => setMessageData({ message: "" })}
            severity={messageData.type}
          >
            {messageData.message}
          </Alert>
        </Snackbar>
      )}
      <TextField
        label="Student"
        placeholder="enter a student name"
        fullWidth
        variant="outlined"
        style={{ margin: "1rem 0" }}
        onChange={handleChange}
        value={studentID}
        InputProps={{
          // placing icons at end
          endAdornment: (
            <InputAdornment position="start">
              {studentID && (
                <>
                  <ClearIcon onClick={() => setStudentID("")} />
                  <SearchIcon
                    onClick={() => {
                      getStudentDetails();
                    }}
                  />
                </>
              )}
            </InputAdornment>
          ),
        }}
      />
      {studentDetails.id && (
        <div className={classes.detailsContainer}>
          <Typography>Student Details</Typography>
          <Grid className={classes.separator}></Grid>
          <Grid container>
            <Grid xs={4}>
              <Typography>ID</Typography>
              <Typography>{studentDetails.id}</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography>First Name</Typography>
              <Typography>{studentDetails.firstName}</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography>Middle Name</Typography>
              <Typography>{studentDetails.middleName}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.separator}></Grid>
          <Grid container>
            <Grid xs={4}>
              <Typography>Last Name</Typography>
              <Typography>{studentDetails.lastName}</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography>Email</Typography>
              <Typography>{studentDetails.email}</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography>Phone Number</Typography>
              <Typography>{studentDetails.phoneNumber}</Typography>
            </Grid>
          </Grid>
        </div>
      )}
      <div className={classes.addBookContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleModal}
          startIcon={<DeleteForeverIcon />}
          disabled={!studentDetails.id}
        >
          Issue Book
        </Button>
      </div>
      <Dialog open={open}>
        <DialogTitle id="alert-dialog-title">
          {`Do you want to delete the student(${studentDetails.id})?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={toggleModal} color="secondary">
            No
          </Button>
          <Button onClick={handleDeleteUser} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;

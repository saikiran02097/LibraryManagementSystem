import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Button,
  Snackbar,
  makeStyles,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import { getAPICall, postAPICall } from "../../apihandlers";
import urls from "../../apihandlers/urls";
import { getTodayDate, Alert } from "../../helpers";

const useStyles = makeStyles((theme) => ({
  issueBookContainer: {
    padding: "1rem",
  },
  separator: {
    padding: "1.5rem",
  },
  detailsContainer: {
    border: "1px solid black",
    width: "100%",
    borderRadius: "1rem",
    padding: "1rem",
  },
  issueButton: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem",
  },
}));

const IssueBook = () => {
  const classes = useStyles();
  const [studentId, setStudentId] = useState("");
  const [messageData, setMessageData] = useState({ message: "", type: "" });
  const [bookISBN, setBookISBN] = useState("");
  const [studentDetails, setStudentDetails] = useState({});
  const [bookDetails, setBookDetails] = useState({});

// api call for getting book details 
  const getBookDetails = () => {
    getAPICall(`${urls.getBooksByISBN}/${bookISBN}`).then((res) => {
      setBookDetails({
        isbn: 5785,
        bookName: "JAVA",
        author: "SMITH",
        originalStock: 15,
        inStock: 15,
        lastUpdatedDate: "29-07-2022",
        temporaryStock: 0,
      });
    });
  };

  // apicall for getting student details
  const getStudentDetails = () => {
    getAPICall(`${urls.getStudentByID}/${studentId}`).then((res) => {
      setStudentDetails({
        id: 123,
        name: "SMITH",
        email: "sample@sample.com",
      });
    });
  };

  //api call for updating student issue table
  const handleIssueBook = () => {
    postAPICall(`${urls.issueBook}`, {
      isbn: bookISBN,
      studentId: studentId,
      issuedBy: "STAURT",
      issueDate: getTodayDate(),
      inStock: bookDetails.inStock,
      lastUpdatedDate: getTodayDate(),
    })
      .then((res) => {
        setMessageData({ message: "Book Issued Succesfully", type: "success" });
      })
      .catch((err) => {
        setMessageData({ message: "unable to issue book", type: "error" });
      });
  };

  return (
    <Grid container className={classes.issueBookContainer}>
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
      <Grid xs={6}>
        <TextField
          label="Student Id"
          placeholder="enter a student name"
          fullWidth
          variant="outlined"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ margin: "1rem 0" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" variant="filled">
                {studentId && (
                  <>
                    <ClearIcon onClick={() => setStudentId("")} />
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
      </Grid>
      <Grid xs={1}></Grid>
      <Grid xs={5}>
        <TextField
          label="Book ISBN"
          placeholder="enter a book isbn"
          fullWidth
          variant="outlined"
          value={bookISBN}
          onChange={(e) => setBookISBN(e.target.value)}
          style={{ margin: "1rem 0" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {bookISBN ? (
                  <>
                    <ClearIcon onClick={() => setBookISBN("")} />
                    <SearchIcon
                      onClick={() => {
                        getBookDetails();
                       
                      }}
                    />
                  </>
                ) : (
                  ""
                )}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {bookDetails.isbn && (
        <div className={classes.detailsContainer}>
          <Typography>Book Details</Typography>
          <Grid className={classes.separator}></Grid>
          <Grid container>
            <Grid xs={4}>
              <Typography>ISBN</Typography>
              <Typography>{bookDetails.isbn}</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography>Name</Typography>
              <Typography>{bookDetails.bookName}</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography>Author</Typography>
              <Typography>{bookDetails.author}</Typography>
            </Grid>
          </Grid>
        </div>
      )}
      <Grid className={classes.separator} xs={12}></Grid>
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
              <Typography>Name</Typography>
              <Typography>{studentDetails.name}</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography>Email</Typography>
              <Typography>{studentDetails.email}</Typography>
            </Grid>
          </Grid>
        </div>
      )}
      <Grid xs={12} className={classes.issueButton}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleIssueBook}
          disabled={!bookDetails.isbn || !studentDetails.id}
           >
          Issue Book
        </Button>
      </Grid>
    </Grid>
  );
};

export default IssueBook;

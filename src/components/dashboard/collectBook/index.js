import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Button,
  Snackbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Table, { StyledTableCell, StyledTableRow } from "../../table";
import urls from "../../apihandlers/urls";
import { getAPICall, postAPICall } from "../../apihandlers";
import { Alert } from "../../helpers";

function createData(author, name, isbn, issued, stock) {
  return { isbn, name, author, issued, stock };
}

const rows = [
  createData("Frozen yoghurt", "abc", 98498, 24, 30),
  createData("Ice cream sandwich", "def", 2783156, 37, 40),
  createData("Eclair", "ghi", 2746354, 24, 30),
  createData("Cupcake", "jkl", 257465135, 67, 75),
  createData("Gingerbread", "mno", 2763385, 49, 60),
];

const columns = [
  {
    align: "left",
    title: "Book Name",
  },
  {
    align: "center",
    title: "ISBN",
  },
  {
    align: "center",
    title: "Author",
  },
  {
    align: "center",
    title: "Issue Date",
  },
  {
    align: "center",
    title: "Penalty",
  },
  {
    align: "center",
    title: "Action(s)",
  },
];

const CollectBook = () => {
  const [studentId, setStudentId] = useState("");
  const [messageData, setMessageData] = useState({ message: "", type: "" });
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});

  const handleChange = (event) => {
    setStudentId(event.target.value);
  };

  const toggleModal = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCollect = (book) => {
    setSelectedBook(book);
    toggleModal();
  };

  const handleCollectBook = () => {
    postAPICall(`${urls.collectBook}`, selectedBook)
      .then((res) => {
        setMessageData({
          message: "Book Collected Succesfully",
          type: "success",
        });
        setOpen(false);
        // rows.shift();
        getStudentBooks();
      })
      .catch((err) => {
        setMessageData({
          message: "unable to update book status",
          type: "error",
        });
        setOpen(false);
      });
  };

  const getStudentBooks = () => {
    getAPICall(`${urls.getStudentBooks}/${studentId}/issued`).then((res) => {
      setBooks(rows);
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
        label="Student Id"
        placeholder="enter a student name"
        fullWidth
        variant="outlined"
        style={{ margin: "1rem 0" }}
        onChange={handleChange}
        value={studentId}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {studentId && (
                <>
                  <ClearIcon onClick={() => setStudentId("")} />
                  <SearchIcon
                    onClick={() => {
                      getStudentBooks();
                    }}
                  />
                </>
              )}
            </InputAdornment>
          ),
        }}
      />
      <Table columns={columns}>
        {books.length > 0 ? (
          books.map((row, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.isbn}</StyledTableCell>
              <StyledTableCell align="center">{row.author}</StyledTableCell>
              <StyledTableCell align="center">{row.issued}</StyledTableCell>
              <StyledTableCell align="center">{row.stock}</StyledTableCell>
              <StyledTableCell align="center">
                <Button variant="outlined" onClick={() => handleCollect(row)}>
                  Collect
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))
        ) : (
          <StyledTableRow>
            <StyledTableCell align="left">
              No Records to display
            </StyledTableCell>
          </StyledTableRow>
        )}
      </Table>
      <Dialog open={open}>
        <DialogTitle id="alert-dialog-title">
          {`Do you want to collect the book ${selectedBook.isbn}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={toggleModal} color="primary">
            No
          </Button>
          <Button onClick={handleCollectBook} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CollectBook;

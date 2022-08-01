import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  makeStyles,
  Typography,
  Grid,
  Snackbar,
} from "@material-ui/core";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import SearchIcon from "@material-ui/icons/Search";
import Table, { StyledTableCell, StyledTableRow } from "../../table";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import "./bookManagement.scss";
import urls from "../../apihandlers/urls";
import { getAPICall, postAPICall } from "../../apihandlers";
import { Alert } from "../../helpers";
import { BookDetailsPopup } from "./bookDetailPopup";

const useStyles = makeStyles((theme) => ({
  addBookContainer: {
    float: "right",
    marginTop: "1rem",
  },
  addBook: {
    backgroundColor: "inherit",
    textTransform: "none",
  },
  input: {
    // padding: "0.5rem"
  },
  separator: {
    padding: "0.5rem",
  },
  detailsContainer: {
    border: "1px solid black",
    borderRadius: "1rem",
    padding: "1rem",
  },
}));

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
    title: "#issued",
  },
  {
    align: "center",
    title: "Stock",
  },
  {
    align: "center",
    title: "Action(s)",
  },
];

const BookManagement = () => {
  const classes = useStyles();
  const [bookISBN, setBookISBN] = useState("");
  const [bookDetails, setBookDetails] = useState({});
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isIncrementBookStockOpen, setIsIncrementBookStockOpen] =
    useState(false);
  const [isDecrementBookStockOpen, setIsDecrementBookStockOpen] =
    useState(false);
  const [messageData, setMessageData] = useState({ message: "", type: "" });

  const addBook = (data) => {
    const book = {
      ...data,
      temporaryStock: 0,
      originalStock: data.temporaryStock,
      inStock: data.temporaryStock,
    };
    setIsAddBookOpen(false);
    postAPICall(`${urls.addBook}`, book)
      .then((res) => {
        setMessageData({
          message: "Book Added Succesfully",
          type: "success",
        });
      })
      .catch((err) => {
        setMessageData({
          message: "unable to add book",
          type: "error",
        });
      });
  };

  const incrementBookStock = (data) => {
    const book = {
      ...data,
      originalStock: data.temporaryStock,
      inStock: data.temporaryStock,
    };
    setIsIncrementBookStockOpen(false);
    postAPICall(`${urls.incrementBookStock}`, book)
      .then((res) => {
        setMessageData({
          message: "Book Stock Incremented Succesfully",
          type: "success",
        });
      })
      .catch((err) => {
        setMessageData({
          message: "unable to increment book stock",
          type: "error",
        });
      });
  };

  const decrementBookStock = (data) => {
    const book = {
      ...data,
      originalStock: data.temporaryStock,
      inStock: data.temporaryStock,
    };
    setIsDecrementBookStockOpen(false);
    postAPICall(`${urls.incrementBookStock}`, book)
      .then((res) => {
        setMessageData({
          message: "Book Stock Decremented Succesfully",
          type: "success",
        });
      })
      .catch((err) => {
        setMessageData({
          message: "unable to decrement book stock",
          type: "error",
        });
      });
  };

  const handleChange = (event) => {
    setBookISBN(event.target.value);
  };

  const handleAddBook = () => {
    setIsAddBookOpen(true);
  };

  const getStudentBooks = () => {
    getAPICall(`${urls.getBooksByISBN}/${bookISBN}`).then((res) => {
      console.log("response",res)
      setBookDetails({
        isbn: 1234567890,
        bookName: "JAVA",
        author: "SMITH",
        originalStock: 15,
        inStock: 15,
        lastUpdatedDate: "29-07-2022",
        temporaryStock: 0,
      });
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
        label="Book ISBN"
        placeholder="enter a book isbn"
        fullWidth
        variant="outlined"
        style={{ margin: "1rem 0" }}
        onChange={handleChange}
        value={bookISBN}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {bookISBN && (
                <>
                  <ClearIcon onClick={() => setBookISBN("")} />
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
      {bookDetails.isbn && (
        <div className={classes.detailsContainer}>
          <Typography>Book Details</Typography>
          <Grid className={classes.separator}></Grid>
          <Grid container>
            <Grid xs={2}>
              <Typography>ISBN</Typography>
              <Typography>{bookDetails.isbn}</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography>Name</Typography>
              <Typography>{bookDetails.bookName}</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography>Author</Typography>
              <Typography>{bookDetails.author}</Typography>
            </Grid>
            <Grid xs={2}>
              <Typography>Increment Stock</Typography>
              <Button>
                <AddBoxIcon
                  style={{ color: "green" }}
                  onClick={() => setIsIncrementBookStockOpen(true)}
                />
              </Button>
            </Grid>
            <Grid xs={2}>
              <Typography>Decrement Stock</Typography>
              <Button>
                <IndeterminateCheckBoxIcon
                  style={{ color: "red" }}
                  onClick={() => setIsDecrementBookStockOpen(true)}
                />
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
      {/* <Table columns={columns}>
        {rows.map((row, key) => (
          <StyledTableRow key={key}>
            <StyledTableCell align="left">{row.name}</StyledTableCell>
            <StyledTableCell align="center">{row.isbn}</StyledTableCell>
            <StyledTableCell align="center">{row.author}</StyledTableCell>
            <StyledTableCell align="center">{row.issued}</StyledTableCell>
            <StyledTableCell align="center">{row.stock}</StyledTableCell>
            <StyledTableCell align="center">
              <RemoveCircleIcon style={{ color: "red" }} />
              <AddCircleIcon style={{ color: "green" }} />
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </Table> */}
      <div className={classes.addBookContainer}>
        <Button
          variant="contained"
          size="medium"
          startIcon={<AddIcon />}
          className={classes.addBook}
          onClick={handleAddBook}
        >
          Book
        </Button>
      </div>
      {isAddBookOpen && (
        <BookDetailsPopup
          title="Add a book"
          buttonText="add"
          callBack={addBook}
          cancelCallBack={() => setIsAddBookOpen(false)}
        />
      )}
      {isIncrementBookStockOpen && (
        <BookDetailsPopup
          title="Increment Stock"
          disabled={true}
          book={bookDetails}
          buttonText="increment"
          callBack={incrementBookStock}
          cancelCallBack={() => setIsIncrementBookStockOpen(false)}
        />
      )}
      {isDecrementBookStockOpen && (
        <BookDetailsPopup
          title="Decrement Stock"
          disabled={true}
          book={bookDetails}
          buttonText="decrement"
          callBack={decrementBookStock}
          cancelCallBack={() => setIsDecrementBookStockOpen(false)}
        />
      )}
    </div>
  );
};

export default BookManagement;

import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
} from "@material-ui/core";

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

export const BookDetailsPopup = ({
  disabled = false,
  book = {},
  title = "",
  buttonText = "",
  callBack = () => {},
  cancelCallBack = () => {},
}) => {
  const classes = useStyles();
  const [bookName, setBookName] = useState(book.bookName || "");
  const [isbn, setIsbn] = useState(book.isbn || "");
  const [author, setAuthor] = useState(book.author || "");
  const [temporaryStock, setTemporaryStock] = useState(0);

  const handleConfirm = () => {
    callBack({ bookName, isbn, author, temporaryStock });
  };

  const handleStockChange = (e) => {
    if (e.target.value >= 0) {
      setTemporaryStock(e.target.value);
    }
  };

  return (
    <Dialog open={true}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={0}>
          <Grid xs={7} className={classes.input}>
            <TextField
              label="Book Name"
              fullWidth
              variant="outlined"
              onChange={(e) => setBookName(e.target.value)}
              value={bookName}
              disabled={disabled}
            />
          </Grid>
          <Grid xs={1}></Grid>
          <Grid xs={4} className={classes.input}>
            <TextField
              label="ISBN No"
              variant="outlined"
              fullWidth
              onChange={(e) => setIsbn(e.target.value)}
              value={isbn}
              disabled={disabled}
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
              disabled={disabled}
            />
          </Grid>
          <Grid xs={1}></Grid>
          <Grid xs={2} className={classes.input}>
            <TextField
              label="Stock"
              variant="outlined"
              type="number"
              onChange={handleStockChange}
              value={temporaryStock}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelCallBack} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookDetailsPopup;

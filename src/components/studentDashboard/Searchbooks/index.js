import React, { useState } from "react";
import { Grid, TextField, InputAdornment, makeStyles } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import { getAPICall } from "../../apihandlers";
import Table, { StyledTableCell, StyledTableRow } from "../../table";

import urls from "../../apihandlers/urls";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      padding: "1rem",
    },
    incon: {
      backgroundColor: "blue",
    },
  };
});

function createData(author, name, isbn, stock,rackno="1a") {
  return { isbn, name, author, stock,rackno };
}

const rows = [
  createData("Frozen yoghurt", "abc", 98498, 24),
  createData("Ice cream sandwich", "def", 2783156, 37),
  createData("Eclair", "ghi", 2746354, 30),
  createData("Cupcake", "jkl", 257465135, 75),
  createData("Gingerbread", "mno", 2763385, 60),
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
    title: "Avaiblility",
  },
  {
    align: "center",
    title: "Rack No",
  },

];

const SearchBooks = () => {
  const classes = useStyles();
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);

  const getBooks = () => {
    getAPICall(`${urls.getBooksByName}/${bookName}`).then((res) => {
      setBooks(rows);
    });
  };

  return (
    <Grid>
      <div className={classes.container}>
        <TextField
          label="Book Name"
          placeholder="enter a book isbn"
          fullWidth
          variant="outlined"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          style={{ margin: "1rem 0" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {bookName ? (
                  <>
                    <ClearIcon onClick={() => setBookName("")} />
                    <SearchIcon
                      onClick={() => {
                        getBooks();
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
        <Table columns={columns}>
          {books.length > 0 ? (
            books.map((row, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.isbn}</StyledTableCell>
                <StyledTableCell align="center">{row.author}</StyledTableCell>
                <StyledTableCell align="center">{row.stock}</StyledTableCell>
                <StyledTableCell align="center">{row.rackno}</StyledTableCell>
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
      </div>
    </Grid>
  );
};

export default SearchBooks;

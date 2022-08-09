import React, { useEffect, useState } from "react";
import Table, { StyledTableCell, StyledTableRow } from "../../table";
import urls from "../../apihandlers/urls";
import { getAPICall } from "../../apihandlers";

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
];

const IssuedBooks = ({ type = "issued" }) => {
  const [books, setBooks] = useState([]);

  const getBooks = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData")) || {};
    if (userData.id) {
      getAPICall(`${urls.getStudentBooks}/${userData.id}/${type}`).then(
        (res) => {
          setBooks(rows);
        }
      );
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="usercontainer">
      <Table columns={columns}>
        {books.length > 0 ? (
          books.map((row, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.isbn}</StyledTableCell>
              <StyledTableCell align="center">{row.author}</StyledTableCell>
              <StyledTableCell align="center">{row.issued}</StyledTableCell>
              <StyledTableCell align="center">{row.stock}</StyledTableCell>
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
  );
};

export default IssuedBooks;

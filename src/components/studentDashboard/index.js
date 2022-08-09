import React from "react";
import Card from "./../dashboard/cards";
import { Grid, makeStyles } from "@material-ui/core";

import Search_book_logo from "../../assets/Search_books_logo.png";
import Issued_book_logo from "../../assets/issued_book_list-logo1.jpg";
import history_logo from "../../assets/Issued-book-hisstory-logo.jpg";

const studentRoutes = [
  {
    path: "/searchbooks",
    image: Search_book_logo,
    name: "Search Book",
  },
  {
    path: "/issuedbooks",
    image: Issued_book_logo,
    name: "Issued Books",
  },
  {
    path: "/bookhistory",
    image: history_logo,
    name: "History",
  },
];

const Student_dashboard = () => {
  return (
    <div style={{ paddingTop: "10rem" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-end"
        rowSpacing={1}
        columnSpacing={{ xs: 1 }}
      >
        {studentRoutes.map((route) => (
          <Card {...route} />
        ))}
      </Grid>
    </div>
  );
};

export default Student_dashboard;

import React from 'react';
import { Grid } from "@material-ui/core"
import mng_books from "../../assets/manage-book-logo.jpg";
import mng_user from "../../assets/manage-user-logo.jpg";
import issue_book from "../../assets/issue-books-logo.jpg";
import collect_book from "../../assets/Collect-book-logo1.png";
import Card from "./cards";

const Adminroutes = [
    {
        path: "/manageusers",
        image: mng_user,
        name: "Manage Users",
    },
    {
        path: "/managebooks",
        image: mng_books,
        name: "Manage Books",
    },
    {
        path: "/issuebook",
        image: issue_book,
        name: "Issue Books",
    },
    {
        path: "/collectbooks",
        image: collect_book,
        name: "Collect Books",
    },
];

const Dashboard = () => {
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
                {Adminroutes.map(route => (<Card {...route} />))}
            </Grid>
        </div>
    )
}

export default Dashboard
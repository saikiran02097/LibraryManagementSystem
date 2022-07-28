import React from 'react';
import Table, { StyledTableCell, StyledTableRow } from '../../table';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import "./bookManagement.scss";

function createData(author, name, isbn, issued, stock) {
    return { isbn, name, author, issued, stock };
}

const rows = [
    createData('Frozen yoghurt', "abc", 98498, 24, 30),
    createData('Ice cream sandwich', "def", 2783156, 37, 40),
    createData('Eclair', "ghi", 2746354, 24, 30),
    createData('Cupcake', "jkl", 257465135, 67, 75),
    createData('Gingerbread', "mno", 2763385, 49, 60),
];

const columns = [
    {
        align: "left",
        title: "Book Name"
    },
    {
        align: "center",
        title: "ISBN"
    },
    {
        align: "center",
        title: "Author"
    },
    {
        align: "center",
        title: "#issued"
    },
    {
        align: "center",
        title: "Stock"
    },
    {
        align: "center",
        title: "Action(s)"
    }
]

const BookManagement = () => {
    return (
        <div className="usercontainer">
            <Table columns={columns}>
                {rows.map((row, key) => (
                    <StyledTableRow key={key}>
                        <StyledTableCell align="left">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.isbn}</StyledTableCell>
                        <StyledTableCell align="center">{row.author}</StyledTableCell>
                        <StyledTableCell align="center">{row.issued}</StyledTableCell>
                        <StyledTableCell align="center">{row.stock}</StyledTableCell>
                        <StyledTableCell align="center" >
                            <RemoveCircleIcon style={{ color: "red" }} />
                            <AddCircleIcon style={{ color: "green" }} />
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </Table>
        </div>
    )
}

export default BookManagement
import React from 'react';
import Table, { StyledTableCell, StyledTableRow } from '../../table';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import "./userManagement.scss";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const columns = [
    {
        align: "left",
        title: "Student Name"
    },
    {
        align: "center",
        title: "Student Id"
    },
    {
        align: "center",
        title: "Phone Number"
    },
    {
        align: "center",
        title: "Email Id"
    },
    {
        align: "center",
        title: "Action(s)"
    }
]

const UserManagement = () => {
    return (
        <div className="usercontainer">
            <Table columns={columns}>
                {rows.map((row, key) => (
                    <StyledTableRow key={key}>
                        <StyledTableCell align="left">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.calories}</StyledTableCell>
                        <StyledTableCell align="center">{row.fat}</StyledTableCell>
                        <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="center">
                            <DeleteForeverIcon />
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </Table>
        </div>
    )
}

export default UserManagement
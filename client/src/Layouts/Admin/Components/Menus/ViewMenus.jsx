import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ViewMenus({ menus, host }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Menu</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menus?.length > 0 ? (
            menus?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar
                    variant="square"
                    sx={{ width: 100, height: 100 }}
                    src={`${host}/uploads/admin/${row?.picture}`}
                    alt="picture"
                  />
                </TableCell>
                <TableCell>{row?.title}</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    disabled
                    multiline
                    rows={2}
                    value={row?.description}
                  />
                </TableCell>
                <TableCell>{row?.category?.title}</TableCell>
                <TableCell>
                  ₹{row?.price} for {row?.servings}
                </TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/Admin/updateMenu/${row?._id}`}
                    variant="contained"
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} sx={{ color: "red", textAlign: "center" }}>
                No menus found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

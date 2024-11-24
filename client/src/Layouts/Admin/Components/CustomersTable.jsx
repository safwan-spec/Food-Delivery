import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { AdminContext } from "../Context/Context";
import { useContext } from "react";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomersTable({ customers }) {
  const { host } = useContext(AdminContext);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan={2}>Customer</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers?.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>
                <Avatar src={`${host}/customerUploads/admin/${row?.profile}`} />
              </StyledTableCell>
              <StyledTableCell>{row?.username}</StyledTableCell>
              <StyledTableCell>{row?.email}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {moment(row?.createdAt).format("DD-MM-YYYY")}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

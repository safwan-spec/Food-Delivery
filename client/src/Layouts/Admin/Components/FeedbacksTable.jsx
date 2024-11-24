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

export default function FeedbacksTable({ feedbacks }) {
  const { host } = useContext(AdminContext);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell>Message</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks?.length > 0 ? (
            feedbacks?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {moment(row?.createdAt).format("DD-MM-YYYY")}
                </StyledTableCell>
                <StyledTableCell>{row?.name}</StyledTableCell>
                <StyledTableCell>{row?.email}</StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    readOnly
                    value={row?.subject}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    readOnly
                    value={row?.message}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={5} align="center">
                No feedbacks found!
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

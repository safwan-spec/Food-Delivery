import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button } from "@mui/material";
import moment from "moment";
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

export default function TableView({
  categories,
  host,
  setSelectedCategory,
  setShow,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sl No</StyledTableCell>
            <StyledTableCell colSpan={2}>Category</StyledTableCell>
            <StyledTableCell>Created</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.length > 0 ? (
            categories?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>
                  <img
                    style={{
                      objectFit: "contain",
                      height: "100px",
                    }}
                    src={`${host}/uploads/admin/${row?.picture}`}
                  />
                </StyledTableCell>
                <StyledTableCell>{row?.title}</StyledTableCell>
                <StyledTableCell>
                  {/* {moment(row?.createdAt).format("DD-MM-YYYY")} */}
                  {moment(row?.createdAt).fromNow()}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    color="secondary"
                    onClick={() => {
                      setShow(true);
                      setSelectedCategory(row);
                    }}
                  >
                    Update
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={3} align="center">
                No categories found!
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

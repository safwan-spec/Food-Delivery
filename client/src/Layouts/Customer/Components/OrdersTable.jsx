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
import GiveRating from "./GiveRating";
import { Rating } from "@mui/material";
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

export default function OrdersTable({ orders }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Menus</StyledTableCell>
            <StyledTableCell>Total Amount</StyledTableCell>
            <StyledTableCell>Payment status</StyledTableCell>
            <StyledTableCell align="center">Order status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {moment(row?.createdAt).format("DD-MM-YYYY")}
              </StyledTableCell>
              <StyledTableCell>
                {row?.menus?.map((item, index) => (
                  <div key={index}>
                    <li>
                      {item?.menuId?.title} * {item?.quantity}
                    </li>
                  </div>
                ))}
              </StyledTableCell>
              <StyledTableCell>₹{row?.totalAmount}</StyledTableCell>
              <StyledTableCell>{row?.paymentStatus}</StyledTableCell>
              <StyledTableCell
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                {row?.orderStatus}
                {row?.status == "Delivered" || !row?.ratings ? (
                  <GiveRating orderId={row?._id} />
                ) : (
                  <>
                    <Rating
                      size="small"
                      value={row?.ratings}
                      precision={0.5}
                      readOnly
                    />
                  </>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

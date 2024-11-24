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
import {
  Box,
  Button,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AdminContext } from "../Context/Context";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#1976d2",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function OrdersTable({ orders, dashboard }) {
  const { updateOrderStatus } = React.useContext(AdminContext);
  const handleUpdateStatus = (id, condition) => {
    const updatedStatus = {};
    if (condition == "Approved") {
      updatedStatus.paymentStatus = "Paid";
      updatedStatus.orderStatus = "Confirmed";
    }
    if (condition == "Rejected") {
      updatedStatus.paymentStatus = "Denied";
      updatedStatus.orderStatus = "Rejected";
    }
    if (condition == "Processing") {
      updatedStatus.orderStatus = "Processing";
    }
    if (condition == "On the Way") {
      updatedStatus.orderStatus = "On the Way";
    }
    if (condition == "Delivered") {
      updatedStatus.orderStatus = "Delivered";
    }
    updateOrderStatus(id, updatedStatus);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <StyledTableRow sx={{ backgroundColor: "#1976d2" }}>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Ordered By</StyledTableCell>
            {!dashboard && (
              <StyledTableCell>Customer & Delivery Address</StyledTableCell>
            )}
            {!dashboard && <StyledTableCell>Menus</StyledTableCell>}
            <StyledTableCell>Total Amount</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            {!dashboard && <StyledTableCell>Actions</StyledTableCell>}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {orders?.map((row, index) => (
            <TableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {moment(row?.createdAt).format("DD-MM-YYYY")}
              </StyledTableCell>
              <StyledTableCell>{row?.customerId?.username}</StyledTableCell>
              {!dashboard && (
                <StyledTableCell>
                  {row?.name}
                  <br />
                  contact : {row?.phone}
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    readOnly
                    value={`${row?.address}, ${row?.location} - ${row?.city}, ${row?.pinCode}`}
                  />
                </StyledTableCell>
              )}
              {!dashboard && (
                <StyledTableCell>
                  {row?.menus?.map((item, index) => (
                    <div key={index}>
                      <li>
                        {item?.menuId?.title} * {item?.quantity}
                      </li>
                    </div>
                  ))}
                </StyledTableCell>
              )}
              <StyledTableCell>₹{row?.totalAmount}</StyledTableCell>
                <StyledTableCell>
              {!dashboard && (
                <>
                  Payment - {row?.paymentStatus}
                  <br />
                  Transaction ID - {row?.transactionId}
                  <br />
                </>
                  
                )}
                Order - {row?.orderStatus}
                </StyledTableCell>
              {!dashboard && (
              <StyledTableCell>
                {row?.orderStatus == "Placed" && (
                  <>
                    <Button
                      onClick={() => handleUpdateStatus(row?._id, "Rejected")}
                      variant="contained"
                      color="error"
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleUpdateStatus(row?._id, "Approved")}
                      variant="contained"
                      color="success"
                    >
                      Approve
                    </Button>
                  </>
                )}
                {row?.orderStatus == "Rejected" && (
                  <Button
                    onClick={() => handleUpdateStatus(row?._id, "Approved")}
                    variant="contained"
                    color="success"
                  >
                    Approve
                  </Button>
                )}
                {row?.orderStatus == "Confirmed" && (
                  <Button
                    onClick={() => handleUpdateStatus(row?._id, "Processing")}
                    variant="contained"
                    color="secondary"
                  >
                    Processing
                  </Button>
                )}
                {row?.orderStatus == "Processing" && (
                  <Button
                    onClick={() => handleUpdateStatus(row?._id, "On the Way")}
                    variant="contained"
                    color="warning"
                  >
                    On the Way
                  </Button>
                )}
                {row?.orderStatus == "On the Way" && (
                  <Button
                    onClick={() => handleUpdateStatus(row?._id, "Delivered")}
                    variant="contained"
                    color="success"
                  >
                    Delivered
                  </Button>
                )}
                {row?.orderStatus == "Delivered" && (
                  <Typography color="success" sx={{ fontWeight: "600" }}>
                    Delivered
                  </Typography>
                )}
                {row?.ratings && (
                  <Tooltip
                    title={
                      row?.feedback ? row.feedback : "Feedback not available"
                    }
                    arrow
                  >
                    <Box>
                      <Rating
                        size="small"
                        value={row?.ratings}
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                  </Tooltip>
                )}
              </StyledTableCell>
               )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

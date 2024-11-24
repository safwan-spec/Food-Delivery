import {
  Box,
  Button,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PageBanner from "../Components/PageBanner";
import { CustomerContext } from "../Context/Context";
import qrCode from "../Assets/qr.png";
export default function CheckOut() {
  const { viewCart, cart, host, placeOrder } = useContext(CustomerContext);
  const [formInfo, setFormInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    location: "",
    city: "",
    pinCode: "",
    message: "",
    transactionId: "",
  });
  const [formError, setFormError] = useState({
    name: null,
    phone: null,
    email: null,
    address: null,
    location: null,
    city: null,
    pinCode: null,
    message: null,
    transactionId: null,
  });
  useEffect(() => {
    viewCart();
  }, []);

  const totalAmount = cart?.reduce((acc, item) => {
    return acc + (item.quantity * item.menuId.price || 0);
  }, 0);

  const handleSubmit = () => {
    const menus = cart?.map((item) => {
      const data = {
        menuId: item?.menuId?._id,
        quantity: item?.quantity,
        total: item?.quantity * item?.menuId?.price,
      };
      return data;
    });
    const updatedOrder = { ...formInfo, menus, totalAmount };
    placeOrder(updatedOrder);
  };

  // console.log(totalAmount);

  return (
    <Box>
      <Box>
        <PageBanner title={"Check out"} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 5,
          flexGrow: 1,
        }}
      >
        <Grid2 container>
          <Grid2 size={{ xs: 12, sm: 8 }}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Enter name"
                    name="name"
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Enter phone"
                    name="phone"
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Enter email"
                    name="email"
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12 }}>
                  <TextField
                    fullWidth
                    label="Complete Address"
                    name="address"
                    multiline
                    rows={2}
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Enter location"
                    name="location"
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Enter city"
                    name="city"
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Enter pin code"
                    name="pinCode"
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12 }}>
                  <TextField
                    fullWidth
                    label="Message (optional)"
                    name="message"
                    multiline
                    rows={2}
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Grid2>
                <Grid2
                  size={{ xs: 12, sm: 12 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img src={qrCode} sx={{ width: "300px" }} />
                  <Typography gutterBottom variant="h5">
                    Amount : ₹{totalAmount}
                  </Typography>
                  <TextField
                    label="Enter transaction id"
                    name="transactionId"
                    onChange={(e) => {
                      setFormInfo({
                        ...formInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    sx={{ p: 1 }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box sx={{ flexFlow: 1, p: 3 }}>
              <Table>
                <TableHead>
                  <TableCell>Menu</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                </TableHead>
                <TableBody>
                  {cart?.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {item?.menuId?.title}
                        <br />₹{item?.menuId?.price}*
                      </TableCell>
                      <TableCell>{item?.quantity}</TableCell>
                      <TableCell>
                        ₹{parseInt(item?.menuId?.price) * item?.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>Total Amount</TableCell>
                    <TableCell colSpan={1}>₹{totalAmount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import CartItem from "../Components/CartItem";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
export default function Cart() {
  const { viewCart, cart, host } = useContext(CustomerContext);
  useEffect(() => {
    viewCart();
  }, []);

  console.log(cart);
  const totalAmount = cart?.reduce((acc, item) => {
    return acc + (item.quantity * item.menuId?.price || 0);
  }, 0);
  return (
    <Box>
      <Box>
        <PageBanner title="Cart" />
      </Box>
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Grid container spacing={2}>
          {cart?.length > 0 ? (
            cart?.map((item, index) => (
              <Grid size={8} key={index}>
                <Item sx={{ height: "100%" }}>
                  <CartItem menuInfo={item} host={host} />
                </Item>
              </Grid>
            ))
          ) : (
            <Grid
              size={12}
              sx={{
                p: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" color="text.secondary">
                Cart is empty!
              </Typography>
            </Grid>
          )}
          {cart?.length > 0 && (
            <Grid size={4} sx={{ height: "100%" }}>
              <Paper sx={{ p: 3, backgroundColor: "#ffb6003b" }}>
                <Box>
                  <Box>
                    <Typography
                      sx={{ fontWeight: "600", fontSize: "20px" }}
                      variant="overline"
                      gutterBottom
                    >
                      Cart Total
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={{ fontWeight: "600" }} variant="h6">
                      Sub Total
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }} variant="h6">
                      ₹ {totalAmount}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={{ fontWeight: "600" }} variant="h6">
                      Delivery Fee
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }} variant="h6">
                      ₹ {0}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={{ fontWeight: "600" }} variant="h6">
                      Grand Total
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }} variant="h6">
                      ₹ {totalAmount}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Button
                      component={Link}
                      to={"/checkOut"}
                      variant="contained"
                      color="warning"
                      fullWidth
                    >
                      Check out
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

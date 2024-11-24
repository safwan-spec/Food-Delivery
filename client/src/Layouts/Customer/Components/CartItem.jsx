import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Avatar, Button, Typography } from "@mui/material";
import { CustomerContext } from "../Context/Context";

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
export default function CartItem({ host, menuInfo }) {
  const { removeMenuFromCart, updateCartQuantity } =
    useContext(CustomerContext);

  const handleQuantity = (qty, condition, id) => {
    // console.log(qty);
    var quantity = 0;
    if (condition == "Plus") {
      quantity = +qty + +1;
    } else {
      quantity = +qty - +1;
    }
    updateCartQuantity(id, quantity);
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={3}>
            <Item elevation={0} sx={{ height: "100%" }}>
              <Avatar
                src={`${host}/uploads/customer/${menuInfo?.menuId?.picture}`}
                variant="square"
                sx={{ width: "100%", height: "100%" }}
              />
            </Item>
          </Grid>
          <Grid size={5}>
            <Item
              elevation={0}
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Box>
                  <Typography>{menuInfo?.menuId?.title}</Typography>
                </Box>
                <Box>
                  <Typography>
                    ₹{menuInfo?.menuId?.price} for {menuInfo?.menuId?.servings}{" "}
                    servings
                  </Typography>
                </Box>
              </Box>
            </Item>
          </Grid>
          <Grid size={4}>
            <Item
              elevation={0}
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "90%",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Button
                    variant="contained"
                    disabled={
                      menuInfo?.quantity == 1 || menuInfo?.quantity < 1
                        ? true
                        : false
                    }
                    onClick={() =>
                      handleQuantity(menuInfo?.quantity, "Minus", menuInfo?._id)
                    }
                  >
                    -
                  </Button>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography>{menuInfo?.quantity}</Typography>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleQuantity(menuInfo?.quantity, "Plus", menuInfo?._id)
                    }
                  >
                    +
                  </Button>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Button
                    onClick={() => removeMenuFromCart(menuInfo?._id)}
                    variant="contained"
                    color="error"
                  >
                    X
                  </Button>
                </Box>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

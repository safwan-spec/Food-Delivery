import { Box, Button } from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import RelatedMenus from "../Components/Menus/RelatedMenus";
import { toast } from "react-toastify";
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
export default function SingleMenu() {
  const { id } = useParams();
  const {
    getSingleMenu,
    relatedMenus,
    singleMenu,
    host,
    addMenuIntoCart,
    customer,
    navigate,
  } = useContext(CustomerContext);

  useEffect(() => {
    getSingleMenu(id);
  }, [id]);

  const handleAddToCart = (id) => {
    if (customer) {
      addMenuIntoCart(id);
    } else {
      toast.warning(`Login to add menu into cart!`);
      navigate("/login");
    }
  };
  //   console.log(relatedMenus);
  //   console.log(singleMenu);
  return (
    <Box>
      <Box>
        <PageBanner title="Menu Details" />
      </Box>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem>
                <ListItemText
                  primary={singleMenu?.title}
                  secondary={singleMenu?.category?.title}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={"Description"}
                  secondary={singleMenu?.description}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`₹${singleMenu?.price}`}
                  secondary={`for ${singleMenu?.servings} serving`}
                />
              </ListItem>
            </List>
            <Box>
              <Button
                color="warning"
                variant="contained"
                sx={{ float: "right" }}
                onClick={() => handleAddToCart(singleMenu?._id)}
              >
                Add to cart
              </Button>
            </Box>
          </Grid>
          <Grid size={6}>
            <Item
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                src={`${host}/uploads/customer/${singleMenu?.picture}`}
                sx={{ width: "100%", height: 400 }}
                variant="square"
              />
            </Item>
          </Grid>
          <Grid size={12}>
            <RelatedMenus menus={relatedMenus} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

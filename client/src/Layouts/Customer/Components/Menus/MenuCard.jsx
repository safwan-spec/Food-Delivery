import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext } from "react";
import { CustomerContext } from "../../Context/Context";
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function MenuCard({ menuInfo }) {
  const { host } = useContext(CustomerContext);
  const [expanded, setExpanded] = React.useState(false);
  console.log(menuInfo);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      component={Link}
      to={`/Menus/${menuInfo?._id}`}
      sx={{ maxWidth: 345, textDecoration: "none" }}
    >
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        title={menuInfo?.title}
        subheader={menuInfo?.category?.title}
      />
      <CardMedia
        component="img"
        height="200"
        image={`${host}/uploads/customer/${menuInfo?.picture}`}
        alt="menu picture"
      />
      <CardActions disableSpacing>₹{menuInfo?.price}</CardActions>
    </Card>
  );
}

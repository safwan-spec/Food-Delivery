import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Link, useNavigate } from "react-router-dom";
import pic from "../Assets/loginBg.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";

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
export default function Login() {
  const { adminLogin } = useContext(AdminContext);
  const [formInfo, setformInfo] = useState({ username: "", password: "" });
  const [formError, setformError] = useState({
    username: null,
    password: null,
  });

  const handleChange = (e) => {
    setformError({ ...formError, [e.target.name]: null });
    setformInfo({ ...formInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (formInfo.username == "") {
      setformError({ ...formError, username: "Username is required!" });
    } else if (formInfo.password == "") {
      setformError({ ...formError, password: "Password is required!" });
    } else {
      setformError({
        username: null,
        password: null,
      });
      adminLogin(formInfo);
    }
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={0}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}
        >
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{ height: { xs: "40vh", sm: "100vh" } }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: { xs: "40vh", sm: "100vh" },
              }}
            >
              <Box sx={{ width: { xs: "90%", sm: "70%" }, mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: "900" }}>
                  Admin SignIn
                </Typography>
              </Box>
              <Box sx={{ width: { xs: "90%", sm: "70%" }, mb: 2 }}>
                <TextField
                  fullWidth
                  name="username"
                  onChange={handleChange}
                  helperText={formError.username && formError.username}
                  error={!!formError.username}
                  label="Enter your username"
                />
              </Box>
              <Box sx={{ width: { xs: "90%", sm: "70%" }, mb: 2 }}>
                <TextField
                  fullWidth
                  name="password"
                  onChange={handleChange}
                  helperText={formError.password && formError.password}
                  error={!!formError.password}
                  label="Enter your password"
                />
              </Box>
              <Box sx={{ width: { xs: "90%", sm: "70%" }, mb: 2 }}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  fullWidth
                  sx={{ p: 1 }}
                >
                  Sign In
                </Button>
              </Box>
              {/* <Box sx={{ width: "70%", mb: 2 }}>
                Don't have an account ? <Link to={"/register"}>Sign Up</Link>
              </Box> */}
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              backgroundImage: `url(${pic})`,
              height: { xs: "15vh", sm: "100vh" },
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              // borderTopRightRadius: { xs: "40px", sm: "0px" },
              // borderTopLeftRadius: { xs: "40px", sm: "0px" },
            }}
          ></Grid>
        </Grid>
      </Box>
    </div>
  );
}

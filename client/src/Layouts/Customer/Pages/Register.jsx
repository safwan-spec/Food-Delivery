import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Link, useNavigate } from "react-router-dom";
import pic from "../Assets/loginBg.jpg";
import axios from "axios";
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
export default function Login() {
  let navigate = useNavigate();
  const [formInfo, setformInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formError, setformError] = useState({
    username: null,
    email: null,
    password: null,
  });

  const handleChange = (e) => {
    setformError({ ...formError, [e.target.name]: null });
    setformInfo({ ...formInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (formInfo.username == "") {
      setformError({ ...formError, username: "Username is required!" });
    } else if (formInfo.email == "") {
      setformError({ ...formError, email: "Email ID is required!" });
    } else if (formInfo.password == "") {
      setformError({ ...formError, password: "Password is required!" });
    } else {
      setformError({
        username: null,
        password: null,
      });
      //   console.log(formInfo);
      axios
        .post("http://localhost:7000/customer/registerCustomer", formInfo)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/login");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid
            size={6}
            sx={{
              backgroundImage: `url(${pic})`,
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Grid>
          <Grid size={6} sx={{ height: "90vh" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh",
              }}
            >
              <Box sx={{ width: "70%", mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: "900" }}>
                  Customer SignUp
                </Typography>
              </Box>
              <Box sx={{ width: "70%", mb: 2 }}>
                <TextField
                  fullWidth
                  name="username"
                  onChange={handleChange}
                  helperText={formError.username && formError.username}
                  error={!!formError.username}
                  label="Enter your username"
                />
              </Box>
              <Box sx={{ width: "70%", mb: 2 }}>
                <TextField
                  fullWidth
                  name="email"
                  onChange={handleChange}
                  helperText={formError.email && formError.email}
                  error={!!formError.email}
                  label="Enter your email Id"
                />
              </Box>
              <Box sx={{ width: "70%", mb: 2 }}>
                <TextField
                  fullWidth
                  name="password"
                  onChange={handleChange}
                  helperText={formError.password && formError.password}
                  error={!!formError.password}
                  label="Enter your password"
                />
              </Box>
              <Box sx={{ width: "70%", mb: 2 }}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  fullWidth
                  sx={{ p: 1 }}
                >
                  Sign Up
                </Button>
              </Box>
              <Box sx={{ width: "70%", mb: 2 }}>
                Already have an account ? <Link to={"/login"}>Sign In</Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

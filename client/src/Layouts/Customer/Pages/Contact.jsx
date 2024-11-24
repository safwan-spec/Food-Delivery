import {
  Box,
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import { useState } from "react";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";

export default function Contact() {
  const { sendFeedback } = useContext(CustomerContext);
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formError, setFormError] = useState({
    name: null,
    email: null,
    subject: null,
    message: null,
  });
  const handleSubmit = () => {
    if (formInfo?.name == "") {
      setFormError({ ...formError, name: "Name is required!" });
    } else if (formInfo?.email == "") {
      setFormError({ ...formError, email: "Email is required!" });
    } else if (formInfo?.subject == "") {
      setFormError({ ...formError, subject: "Subject is required!" });
    } else if (formInfo?.message == "") {
      setFormError({ ...formError, message: "Message is required!" });
    } else {
      sendFeedback(formInfo);
      setFormInfo({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };
  return (
    <Box>
      <Box>
        <PageBanner title="Contact Us" />
      </Box>
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Grid2
          container
          component={Paper}
          sx={{ p: 2, backgroundColor: "#fca60047", borderRadius: "20px" }}
          elevation={5}
        >
          <Grid2
            item
            size={{ xs: 12, sm: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "90%",
                p: 3,
                textAlign: "center",
                height: { sm: "45vh", xs: "auto" },
              }}
            >
              <Typography
                variant="h2"
                sx={{ fontWeight: 900, fontSize: { xs: "35px", sm: "50px" } }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: { xs: "14px", sm: "16px" } }}
              >
                feel free to reach out to us! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Laboriosam, numquam.
              </Typography>
            </Box>
          </Grid2>
          <Grid2
            item
            size={{ xs: 12, sm: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "90%",
                p: 3,
                textAlign: "center",
                height: { sm: "45vh", xs: "auto" },
              }}
            >
              <Box sx={{ width: "100%", p: 2 }}>
                <Grid2 container spacing={2}>
                  <Grid2 item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Enter your name"
                      name="name"
                      value={formInfo.name}
                      onChange={(e) => {
                        setFormError({ ...formError, [e.target.name]: null });
                        setFormInfo({
                          ...formInfo,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      helperText={formError.name && formError.name}
                      error={!!formError.name}
                      sx={{ mb: 1 }}
                    />
                  </Grid2>
                  <Grid2 item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Enter your email ID"
                      name="email"
                      value={formInfo.email}
                      onChange={(e) => {
                        setFormError({ ...formError, [e.target.name]: null });
                        setFormInfo({
                          ...formInfo,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      helperText={formError.email && formError.email}
                      error={!!formError.email}
                      sx={{ mb: 1 }}
                    />
                  </Grid2>
                  <Grid2 item size={{ xs: 12, sm: 12 }}>
                    <TextField
                      fullWidth
                      label="Enter subject"
                      name="subject"
                      value={formInfo.subject}
                      onChange={(e) => {
                        setFormError({ ...formError, [e.target.name]: null });
                        setFormInfo({
                          ...formInfo,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      helperText={formError.subject && formError.subject}
                      error={!!formError.subject}
                      sx={{ mb: 1 }}
                    />
                  </Grid2>
                  <Grid2 item size={{ xs: 12, sm: 12 }}>
                    <TextField
                      fullWidth
                      label="Type Message"
                      placeholder="type your message here"
                      multiline
                      rows={2}
                      name="message"
                      value={formInfo.message}
                      onChange={(e) => {
                        setFormError({ ...formError, [e.target.name]: null });
                        setFormInfo({
                          ...formInfo,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      helperText={formError.message && formError.message}
                      error={!!formError.message}
                      sx={{ mb: 1 }}
                    />
                  </Grid2>
                  <Grid2 item size={{ xs: 12, sm: 12 }}>
                    <Button
                      onClick={handleSubmit}
                      fullWidth
                      variant="contained"
                      color="warning"
                      sx={{ p: 1 }}
                    >
                      Submit
                    </Button>
                  </Grid2>
                </Grid2>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
      <Box sx={{ p: 3 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.31722005161!2d74.76966120007422!3d12.923146607058982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x827bbc7a74fcfe64!2sMangaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1726900807747!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </Box>
  );
}

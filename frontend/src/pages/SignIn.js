import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


const defaultTheme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();

   const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Simulating form submission with API request
      try {
        const res = await fetch("http://localhost:4000/users/login", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        if (res.status === 200) {
          formik.setValues({
            email: "",
            password: "",
          });
          // sessionStorage.setItem("message", "Verification is under process");
          setTimeout(() => {
            sessionStorage.removeItem("message");
          }, 3000);
          navigate("/signup");
        }
        else if (res.status === 400) {
          setErrorMessage("Invalid email or password. Try Again."); // Set the error message
          // toast.error("Invalid email or password. Try Again.", {
          //   position: toast.POSITION.BOTTOM_CENTER,
          // });
        }
        const data = await res.json();
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("role", data.role);
        if (sessionStorage.getItem("token") !== "undefined") {
          resetForm();
          navigate("/");
        }
        // Perform further actions based on the API response
      } catch (error) {
        console.error("Error submitting the form:", error);
        setErrorMessage("Invalid email or password. Try Again.");
        // toast.error("Invalid email or password. Try Again.", {
        //   position: toast.POSITION.BOTTOM_CENTER,
        // });
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errorMessage && (
            <Typography color="error" variant="body2" align="center">
              {errorMessage}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...formik.getFieldProps("email")}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              {...formik.getFieldProps("password")}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;

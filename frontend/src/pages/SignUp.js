import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is Required"),
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
        const res = await fetch("http://localhost:4000/users/signup", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res.status);
        if (res.status === 200) {
          formik.setValues({
            name: "",
            email: "",
            password: "",
            role: "",
          });
          sessionStorage.setItem("message", "Verification is under process");
          setTimeout(() => {
            sessionStorage.removeItem("message");
          }, 3000);
          navigate("/signup");
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
        // Handle error case
      }
    },
  });

  const message = sessionStorage.getItem("message");
  console.log(message);
  return message ? (
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
          <Typography component="h1" variant="h5">
            Verification in Process
          </Typography>
          {/* <Typography variant="body1">{message}</Typography> */}
          <Link to="/signin">
            {" "}
            <Button variant="primary">Login</Button>{" "}
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  ) : (
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  {...formik.getFieldProps("name")}
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                  error={formik.touched.name && formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...formik.getFieldProps("email")}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...formik.getFieldProps("password")}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={formik.touched.password && formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.age && Boolean(formik.errors.age)}
                >
                  <InputLabel id="age-label">Role</InputLabel>
                  <Select
                    {...formik.getFieldProps("role")}
                    labelId="age-label"
                    id="role"
                    name="role"
                    value={formik.values.role}
                    label="Role"
                  >
                    <MenuItem value={"Chef"}>Chef</MenuItem>
                    <MenuItem value={"Critic"}>Critic</MenuItem>
                    <MenuItem value={"User"}>User</MenuItem>
                  </Select>
                  {formik.touched.age && formik.errors.age && (
                    <Box component="span" sx={{ color: "red" }}>
                      {formik.errors.age}
                    </Box>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link to="/signin">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignUp;

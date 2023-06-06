import React, { Fragment, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavMenu from "../components/NavMenu";
import Banner from "../components/Banner";
import AddRecipeIcon from "../assets/food.png";
import { useParams } from "react-router-dom";

const EditRecipePage = () => {
  const { id } = useParams();

  const [message, setMessage] = useState(null);
  const [recipeData, setRecipeData] = useState(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Recipe name is required"),
    ingredients: Yup.string().required("Ingredients are required"),
    directions: Yup.string().required("Directions are required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      ingredients: "",
      directions: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch(
          `http://localhost:4000/recipes/updateRecipe/${id}`,
          {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          setMessage("Recipe updated successfully!");
        } else {
          setMessage("Error updating recipe. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        setMessage("Error updating recipe. Please try again.");
      }
    },
  });

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/recipes/viewOneRecipe/${id}`,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRecipeData(data.recipe[0]); // Update the recipe data state
        formik.setValues(data.recipe[0]); // Set formik values with existing recipe data
      } else {
        console.log("Failed to fetch recipe.");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  return (
    <Fragment>
      <NavMenu />
      <Banner title={"Edit Recipe"} />
      <Container
        component="main"
        maxWidth="md"
        style={{ marginBottom: "50px" }}
      >
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            padding: "20px",
            background: "#fff",
            borderRadius: "20px",
          }}
        >
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <img
              src={AddRecipeIcon}
              alt="Recipe"
              style={{ width: "100px", display: "block", margin: "auto" }}
            />
            <TextField
              {...formik.getFieldProps("title")}
              fullWidth
              id="title"
              label="Recipe Name"
              variant="outlined"
              margin="normal"
              error={formik.touched.title && formik.errors.title}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              {...formik.getFieldProps("ingredients")}
              fullWidth
              id="ingredients"
              label="Ingredients"
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              error={formik.touched.ingredients && formik.errors.ingredients}
              helperText={
                formik.touched.ingredients && formik.errors.ingredients
              }
            />
            <TextField
              {...formik.getFieldProps("directions")}
              fullWidth
              id="directions"
              label="Directions"
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              error={formik.touched.directions && formik.errors.directions}
              helperText={formik.touched.directions && formik.errors.directions}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: "30px auto", display: "block" }}
            >
              Update Recipe
            </Button>
            {message && (
              <Typography
                variant="body1"
                style={{
                  color: message.startsWith("Error") ? "red" : "green",
                  marginTop: "20px",
                }}
              >
                {message}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default EditRecipePage;

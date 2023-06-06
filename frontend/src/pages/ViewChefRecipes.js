import React, { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner";
import NavMenu from "../components/NavMenu";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Poster from "../assets/poster.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AllRecipes = () => {
  const { id } = useParams();
  const defaultTheme = createTheme();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/recipes/viewChefRecipes/${id}`,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRecipes(data.chefRecipes);
      } else {
        console.log("Failed to fetch recipes.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  async function remove(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(
      `http://localhost:4000/recipes/deleteRecipe/${_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      fetchRecipes();
    }
  }

  async function saved(_id) {
    const res = await fetch(`http://localhost:4000/users/favRecipes/${_id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      fetchRecipes();
    }
  }

  const handleAddComment = async (recipeId, comment) => {
    try {
      const response = await fetch(
        `http://localhost:4000/recipes/${recipeId}/comments`,
        {
          method: "POST",
          body: JSON.stringify({ comment }),
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Comment added successfully.");
        // You can perform any additional actions after adding the comment
      } else {
        console.log("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Fragment>
      <NavMenu />
      <Banner title={"Recepies"} />
      <ThemeProvider theme={defaultTheme}>
        <main style={{ marginBottom: "50px" }}>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4} style={{ paddingTop: "50px" }}>
              {recipes.map((recipe) => (
                <Grid item key={recipe._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    className="recipe_card"
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={Poster} // Replace with the image URL of the recipe
                      alt="Recipe Poster"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {recipe.title}
                      </Typography>
                      <Typography
                        className="recipe_desc_text"
                        style={{ margin: "20px 0", color: "#1976d2" }}
                      >
                        <AccountCircleIcon style={{ marginRight: "10px" }} />
                        {recipe.creator}
                      </Typography>
                      <Typography
                        className="recipe_desc_text"
                        style={{ margin: "15px 0" }}
                      >
                        {recipe.ingredients}
                      </Typography>
                      <Typography className="recipe_desc_text">
                        {recipe.directions}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* View */}
                      <Link to={`/recipe/${recipe._id}`}>
                        <Button size="small">View</Button>
                      </Link>

                      {/* Favorites */}
                      {sessionStorage.getItem("role") === "Admin" ||
                      sessionStorage.getItem("role") === "Chef" ? (
                        " "
                      ) : (
                        <Link to={`/favorites`}>
                          <Button
                            size="small"
                            onClick={() => saved(recipe._id)}
                          >
                            Save
                          </Button>
                        </Link>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </Fragment>
  );
};

export default AllRecipes;

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
import { Link } from "react-router-dom";
import Poster from "../assets/poster.jpg";

const AllRecipes = () => {
  const defaultTheme = createTheme();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/users/getUserFavoriteRecipes",
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRecipes(data.favoriteRecipes);
        console.log(data.favoriteRecipes);
      } else {
        console.log("Failed to fetch recipes.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <Fragment>
      <NavMenu />
      <Banner title={"Favorites"} />
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

import React, { Fragment, useState, useEffect } from "react";
import NavMenu from "../components/NavMenu";
import Banner from "../components/Banner";
import { Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Recipe = () => {
  const { id } = useParams();

  const [recipeData, setRecipeData] = useState(null);
  const [comment, setComment] = useState("");
  const [submittedComment, setSubmittedComment] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
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

        sessionStorage.setItem("createdBy", data.currentUser);
        setRecipeData(data.recipe[0]);
      } else {
        console.log("Failed to fetch recipes.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    // Make the POST request to submit the comment
    const res = await fetch(`http://localhost:4000/recipes/addComment/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ comment }),
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setComment("");
      fetchRecipes();
    }
  };

  async function handleDeleteComment(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(
      `http://localhost:4000/recipes/${id}/comments/${_id}`,
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

  return (
    <Fragment>
      <NavMenu />
      <Banner title={"Recipe"} />
      <Container>
        {recipeData ? (
          <>
            <h1 className="recipe-names">{recipeData.title}</h1>
            <div className="recipe_card">
              <h3 className="recipe_subtitle">{recipeData.ingredients}</h3>
            </div>
            <div className="recipe_desc">
              <h3 className="recipe_subtitle">Description</h3>
              <p>{recipeData.directions}</p>
            </div>
            <hr />
            <div className="comment-section">
              <h3 className="recipe_subtitle">Add a Comment</h3>
              {recipeData.comments && recipeData.comments.length > 0 && (
                <div>
                  {recipeData.comments.map((comment) => (
                    <div
                      key={comment._id}
                      style={{
                        padding: "10px 10px",
                        background: "#fff",
                        borderRadius: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      <div>
                        <AccountCircleIcon
                          style={{ color: "green", marginBottom: "10px" }}
                        />
                        {comment.creator}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {comment.comment}

                        {comment.createdBy ==
                        sessionStorage.getItem("createdBy") ? (
                          <DeleteSweepIcon
                            onClick={() => handleDeleteComment(comment._id)}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Form onSubmit={handleSubmitComment}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your comment"
                  value={comment}
                  onChange={handleCommentChange}
                />
                <Button
                  type="submit"
                  style={{
                    margin: "20px auto 50px auto",
                    width: "200px",
                    padding: "10px 20px",
                    display: "block",
                  }}
                >
                  Submit
                </Button>
              </Form>
              {submittedComment && (
                <div className="submitted-comment">
                  <h5>Your Comment:</h5>
                  <div>{submittedComment}</div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Loading recipe data...</p>
        )}
      </Container>
    </Fragment>
  );
};

export default Recipe;

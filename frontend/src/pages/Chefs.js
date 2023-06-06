import React, { Fragment, useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import NavMenu from "../components/NavMenu";
import Banner from "../components/Banner";
import ChefAvatar from "../assets/chef.jpg";
import { CardActions } from "@mui/material";
import { Link } from "react-router-dom";

const Chefs = () => {
  const [chefs, setChefs] = useState([]);
  const [rank, setRank] = useState(5); // Default value for rank

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:4000/users/viewChefs", {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setChefs(data.chefs);
      } else {
        console.log("Failed to fetch Chef List.");
      }
    } catch (error) {
      console.error("Error fetching chefs:", error);
    }
  };

  const handleRankingChange = (e) => {
    setRank(e.target.value);
  };

  async function editRanking(chefId) {
    try {
      const res = await fetch(
        `http://localhost:4000/users/rankChef/${chefId}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rank }),
        }
      );

      if (res.ok) {
        fetchRecipes();
      } else {
        console.log("Failed to update chef's ranking.");
      }
    } catch (error) {
      console.error("Error updating chef's ranking:", error);
    }
  }

  return (
    <Fragment>
      <NavMenu />
      <Banner title={"Our Certified Chefs"} />
      <Container style={{ marginBottom: "50px" }}>
        <Row xs={1} md={2} lg={4} className="g-4" style={{ margin: "50px 0" }}>
          {chefs.map((chef) => (
            <Col key={chef._id}>
              <Card
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  border: "none",
                }}
              >
                <Card.Body>
                  <img
                    src={ChefAvatar}
                    alt="chef"
                    style={{
                      borderRadius: "50%",
                      width: "30%",
                      marginBottom: "15px",
                    }}
                  />
                  <Card.Title>{chef.name}</Card.Title>
                  <Card.Text>Email: {chef.email}</Card.Text>
                  <Card.Text>Ranking: {chef.finalRank}</Card.Text>
                  <CardActions style={{ paddingLeft: "0" }}>
                    {/* Edit */}
                    <Link to={`/chefrecipes/${chef._id}`}>
                      <Button variant="outline-primary">View Recipes</Button>
                    </Link>
                  </CardActions>
                  {sessionStorage.getItem("role") === "Critic" ? (
                    <Form.Group className="mt-3 mb-3">
                      <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col md={2}>
                          <Form.Label>Rank</Form.Label>
                        </Col>
                        <Col md={6}>
                          <Form.Select
                            onChange={handleRankingChange}
                            value={rank}
                          >
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                          </Form.Select>
                        </Col>
                        <Col md={4}>
                          <Button
                            variant="dark"
                            onClick={() => editRanking(chef._id)}
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  ) : (
                    " "
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Chefs;

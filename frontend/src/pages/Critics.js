import React, { Fragment, useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import NavMenu from "../components/NavMenu";
import Banner from "../components/Banner";
import ChefAvatar from "../assets/chef.jpg";

const Critics = () => {
  const [critics, setCritics] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:4000/users/viewCritics", {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCritics(data.critics);
      } else {
        console.log("Failed to fetch Chef List.");
      }
    } catch (error) {
      console.error("Error fetching chefs:", error);
    }
  };

  return (
    <Fragment>
      <NavMenu />
      <Banner title={"Our Certified Critics"} />
      <Container>
        <Row xs={1} md={2} lg={4} className="g-4" style={{ margin: "50px 0" }}>
          {critics.map((critic) => (
            <Col key={critic.id}>
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
                  <Card.Title>{critic.name}</Card.Title>
                  <Card.Text>Email: {critic.email}</Card.Text>
                  <Card.Text>Ranking: {critic.ranking}</Card.Text>
                  {/* <Card.Text>Recipes: {critic.recipes.join(", ")}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Critics;

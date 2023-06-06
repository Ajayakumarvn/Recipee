import React, { Fragment, useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import NavMenu from "../components/NavMenu";
import Banner from "../components/Banner";
import ChefAvatar from "../assets/chef.jpg";

const Critics = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/users/viewUsers", {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
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
      `http://localhost:4000/users/deleteAnyUser/${_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      fetchUsers();
    }
  }

  return (
    <Fragment>
      <NavMenu />
      <Banner title={"Users"} />
      <Container>
        <Row xs={1} md={2} lg={4} className="g-4" style={{ margin: "50px 0" }}>
          {users.map((user) => (
            <Col key={user.id}>
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
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>Email: {user.email}</Card.Text>
                  <Card.Text>Ranking: {user.ranking}</Card.Text>
                  {/* <Card.Text>Recipes: {user.recipes.join(", ")}</Card.Text> */}
                  <div>
                    {" "}
                    <Button size="small" onClick={() => remove(user._id)}>
                      Delete
                    </Button>
                  </div>
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

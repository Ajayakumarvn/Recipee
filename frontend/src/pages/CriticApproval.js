import React, { useState, useEffect, Fragment } from "react";
import NavMenu from "../components/NavMenu";
import Banner from "../components/Banner";
import Table from "react-bootstrap/Table";
import { Button, Container } from "react-bootstrap";

const ChefApproval = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCritics();
  }, []);

  const fetchCritics = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/users/waitingListCritic",
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data.waitingCritics);
      } else {
        console.log("Failed to Critics.");
      }
    } catch (error) {
      console.error("Error fetching Critics:", error);
    }
  };

  const handleApprove = (userId) => {
    const approveUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/users/verifyCritic_Chef/${userId}`,
          {
            method: "PATCH",
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          fetchCritics();
        }
        // Remove the deleted user from the state
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    approveUser();
  };

  const handleReject = (userId) => {
    const rejectUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/users/rejectCritic_Chef/${userId}`,
          {
            method: "PATCH",
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          fetchCritics();
        }
        // Remove the deleted user from the state
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    rejectUser();
  };

  return (
    <Fragment>
      <NavMenu />
      <Banner title={"Approve Critic"} />
      <Container style={{ marginTop: "30px" }}>
        <Table striped bordered hover style={{ background: "#fff" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleApprove(user._id)}
                    style={{ marginRight: "30px" }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleReject(user._id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
};

export default ChefApproval;

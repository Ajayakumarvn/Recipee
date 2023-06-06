import React, { Fragment, useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Container } from "react-bootstrap";
import NavMenu from "../components/NavMenu";
import Banner from "../components/Banner";
import User from "../assets/user.png";

const ProfileCard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/users/viewMyProfile",
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data.myProfile[0]);
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
      <Banner title={"Your Profile"} />
      <Container maxWidth="sm">
        <Card
          style={{
            margin: "50px auto",
            width: "400px",
            display: "block",
            padding: "20px",
          }}
        >
          {user && (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <img src={User} alt="user-profile" style={{ width: "100px" }} />
                <Typography
                  variant="h5"
                  component="div"
                  style={{ textTransform: "uppercase", margin: "20px 0" }}
                >
                  {user.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="body2">{user.username}</Typography>
                <Typography variant="body2">{user.role}</Typography>
              </CardContent>
            </Card>
          )}
        </Card>
      </Container>
    </Fragment>
  );
};

export default ProfileCard;

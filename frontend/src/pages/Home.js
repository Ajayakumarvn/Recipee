import React, { Fragment } from "react";
import NavMenu from "../components/NavMenu";
import { Container } from "react-bootstrap";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <div className="main_banner">
        <NavMenu />
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <div className="banner_content">
            <h1 className="banner-head display-1">
              Better taste to make you better
            </h1>
            <Link to="/recipes">
              <button className="banner_button">
                Explore More <ArrowForwardIcon />
              </button>
            </Link>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default Home;

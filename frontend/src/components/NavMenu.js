import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

const NavMenu = () => {

  const logOutHandler = () => {
    sessionStorage.clear();

  };

  return (
    <Navbar
      expand="lg"
      style={{
        position: "fixed",
        width: "100%",
        zIndex: "10",
        background: "rgba(0,0,0,.5)",
      }}
    >
      <Container className="menulist">
        <Link to="/">
          <Navbar.Brand>Recipee</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ justifyContent: "flex-end" }}
        >
          <div className="menu">
          {sessionStorage.getItem("role") === null ? " " :<NavLink to="/">Home</NavLink>}
            {sessionStorage.getItem("role") === null ? " " : <NavLink to="/recipes">Recipes</NavLink>}
            {sessionStorage.getItem("role") === "Chef" ||
            sessionStorage.getItem("role") === "User" ? (
              <NavLink NavLink to="/addrecipe">
                Add Recipes
              </NavLink>
            ) : (
              " "
            )}
            {sessionStorage.getItem("role") === "Chef" ||
            sessionStorage.getItem("role") === "User" ? (
              <NavLink to="/myrecipe">My Recipe</NavLink>
            ) : (
              " "
            )}
            
            {sessionStorage.getItem("role") === null ? " " :<NavLink to="/chefs">Chefs</NavLink>}

            {sessionStorage.getItem("role") === "Admin" ? (
              <NavLink to="/critics">Critics</NavLink>
            ) : (
              " "
            )}
            {sessionStorage.getItem("role") === "Admin" ? (
              <NavLink to="/users">Users</NavLink>
            ) : (
              " "
            )}
            {sessionStorage.getItem("role") === "User" ||
            sessionStorage.getItem("role") === "Critic" ? (
              <NavLink to="/favorites">Favorites</NavLink>
            ) : (
              " "
            )}

            {sessionStorage.getItem("role") === "Admin" ? (
              <NavLink to="/approve_chef">Approve Chef</NavLink>
            ) : (
              ""
            )}
            {sessionStorage.getItem("role") === "Admin" ? (
              <NavLink to="/approve_critic">Approve Critics</NavLink>
            ) : (
              " "
            )}

            {sessionStorage.getItem("role") === null ? " " :<NavLink to="/profile">Profile</NavLink>}

            {sessionStorage.getItem("token") ? (
              <NavLink to="/signin">
                <Button variant="danger" onClick={logOutHandler}>
                  Logout
                </Button>{" "}
              </NavLink>
            ) : (
              <NavLink to="/signin">
                <Button variant="success">SignIn</Button>{" "}
              </NavLink>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;

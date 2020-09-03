import React from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ color: "white" }}>
      <Link to="/">
        <Navbar.Brand>StockHub</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Docs</Nav.Link>
          <Nav.Link href="#link">Community</Nav.Link>
        </Nav>
        <Link to="/login">
          <Button
            style={{
              marginRight: "0.5rem",
              backgroundColor: "rgba(52, 1, 86, 0.5)",
              border: "1px solid white",
            }}
          >
            Log in
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            variant="light"
            style={{
              border: "1px solid rgba(52, 1, 86, 0.5)",
              color: "rgba(52, 1, 86, 0.5)",
            }}
          >
            Sign up
          </Button>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

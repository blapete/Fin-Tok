import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBtn,
} from "mdbreact";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <MDBNavbar color="unique-color-dark" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              StockHub
            </Link>
          </strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="#!">Docs</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Community</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem></MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem></MDBNavItem>
            <MDBNavItem>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                <MDBBtn color="dark-green">Signup</MDBBtn>
              </Link>
            </MDBNavItem>
            <MDBNavItem>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                <MDBBtn outline color="success">
                  Login
                </MDBBtn>
              </Link>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      <br />
    </div>
  );
};

export default Navbar;

import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink as Link } from "react-router-dom";
import "../css/Navbar.css";

const NavBar = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="background-nav"
        variant="light"
      >
        <Container>
          <div className="navbar-brand-container">
            <Navbar.Brand as={Link} to="/">
              Runescape Player Status
            </Navbar.Brand>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;

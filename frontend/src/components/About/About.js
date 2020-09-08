import React from "react";
import Navbar from "../Navbar/Navbar";
import { Container } from "react-bootstrap";
import "./About.css";

const About = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <div id="about__Box">
          <p id="about__Text">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </div>
      </Container>
    </div>
  );
};

export default About;

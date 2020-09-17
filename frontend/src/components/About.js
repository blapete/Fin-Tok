import React from 'react'
import Navbar from './Navbar'
import { Container } from 'react-bootstrap'
//--------------------

//Component
const About = () => {
	return (
    <div>
      <Navbar />
      <Container>
        <div id="about__Box">
          <p className="about__Text">
            “Rule number one: Don’t lose money. Rule number two: Don’t forget
            rule number one.”
          </p>
          <p className="about__Text">- Warren Buffet</p>
        </div>
      </Container>
    </div>
  );
}

export default About

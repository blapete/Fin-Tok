import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import "./Footer.css";

const FooterPage = () => {
  return (
    <MDBFooter>
      <div id="footer" className="footer-copyright text-center py-3">
        <MDBContainer fluid>Powered by Yahoo Finance</MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;

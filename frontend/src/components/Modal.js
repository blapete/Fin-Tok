import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const StockModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        id="modal__Button"
        style={{
          backgroundColor: "rgba(52, 1, 86, 0.5)",
          border: "1px solid white",
          color: "black",
        }}
        onClick={handleShow}
      >
        Lookup Symbols
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Symbols</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul style={{ listStyleType: "none" }}>
            <li>Apple, Inc. - AAPL</li>
            <hr />
            <li>Tesla, Inc. - TSLA</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            style={{
              border: "1px solid rgba(52, 1, 86, 0.5)",
              color: "rgba(52, 1, 86, 0.9)",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StockModal;

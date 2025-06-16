import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * ConfirmModal component that displays a modal dialog.
 * 
 * @param {boolean} show - Determines if the modal is visible.
 * @param {Function} onHide - Function to toggle the visibility of the modal.
 * @returns {ReactElement} The ConfirmModal component.
 */

const ConfirmModal = ({ show, onHide}) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Modal.Header closeButton style={{backgroundColor:"#B2B7BA"}}>
        <Modal.Title id="contained-modal-title-vcenter">
          <>
          <div style={{fontSize:"18px"}}>
          Backend-sovelluskehitys 2 HTKA0150-3004
          </div>
          <div style={{fontSize:"14px"}}>
          Timo Laakkonen AA4598
          </div>
          </>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{fontSize:"16px"}}> NDVI-demo</h5>
        <p style={{fontSize:"14px"}}>
          Frontend application for AWS-serverless which shows NDVI-images and
          statistics for the specifig area of interest
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

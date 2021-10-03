import React from 'react';
import { Modal } from 'react-bootstrap';

export default function ModalWindow(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} size={props.size}>
      <Modal.Header closeButton style={props.style}>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={props.style}>{props.body}</Modal.Body>
      <Modal.Header style={props.style}>
        <Modal.Title>{props.footer}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
}

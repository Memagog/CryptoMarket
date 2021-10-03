import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap';

export default function ModalWindow(props) {
  useEffect(() => {
    console.log(props.coin)
  }, [])
  return (
    <Modal show={props.show} onHide={props.handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.body}
      </Modal.Body>
      <Modal.Header>
        <Modal.Title>{props.footer}</Modal.Title>
      </Modal.Header>
    </Modal>
  )
}

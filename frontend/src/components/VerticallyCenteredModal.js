import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


export function VerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    { props.title }
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {props.text}
          </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { props.callback(); props.onHide(); } }>{ props.confirmButtonText }</Button>
                <Button onClick={props.onHide}>Abbrechen</Button>
            </Modal.Footer>
        </Modal>
    );
}
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const DeletePayment = ({ show, handleClose }) => {
    return(
        <Modal 
        show={show} onHide={handleClose}
        size="md w-48"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Body>
            <div className="d-flex justify-content-center"><img src="icon_exclamation.png"></img></div>
            <div className="d-flex justify-content-center"><h6>Are you sure this payment is completed?</h6></div>
            <div className="d-flex justify-content-center">
                <Button className="px-4 me-2 bg-search-gray border-0 txt-black">Yes</Button>
                <Button className="px-4 bg-main-dominant-red border-0">No</Button>
            </div>
        </Modal.Body>

        </Modal>
    );
};

export default DeletePayment
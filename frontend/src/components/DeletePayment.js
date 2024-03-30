import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';

const DeletePayment = ({ show, handleClose }) => {
    return(
        <Modal 
        show={show} onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >

        </Modal>
    );
};

export default DeletePayment
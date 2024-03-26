import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const ArchiveWarning = ({ show, handleClose }) => {
    return(
        <Modal 
        show={show} onHide={handleClose}
        size="md w-48"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Body>
            <div className="d-flex justify-content-center"><img src="icon_exclamation.png"></img></div>
            <div className="d-flex justify-content-center"><h6>This feature is for notifications in the “Archive” tab only.</h6></div>
            <div className="d-flex justify-content-center">
                <Button className="px-4 bg-white shadow txt-black border-0">Ok</Button>
            </div>
        </Modal.Body>

        </Modal>
    );
};

export default ArchiveWarning
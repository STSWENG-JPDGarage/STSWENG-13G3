import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { DOMAIN } from '../config'

const DeletePayment = ({ show, handleClose, handleCloseEdit, id }) => {

    // Handles deleting payment reminder from the database
    const handleDeleteReminder = async () => {
        try {
        const response = await fetch(`${DOMAIN}/paymentReminder/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            console.log('Payment reminder deleted successfully');
            alert('Payment reminder successfully deleted!');
            handleClose();
            handleCloseEdit();
        } else {
            console.error('Failed to delete payment reminder:', response.statusText);
        }
        } catch (error) {
            console.error('Error deleting payment reminder:', error);
        }
    };

    return(
        <Modal 
        show={show} 
        onHide={handleClose}
        size="md w-48"
        aria-labelledby="contained-modal-title-vcenter"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        centered
        >
        <Modal.Body>
            <div className="d-flex justify-content-center"><img src="icon_exclamation.png"></img></div>
            <div className="d-flex justify-content-center"><h6>Are you sure this payment is completed?</h6></div>
            <div className="d-flex justify-content-center">
                <Button onClick={handleDeleteReminder} className="px-4 me-2 bg-search-gray border-0 txt-black">Yes</Button>
                <Button onClick={handleClose} className="px-4 bg-main-dominant-red border-0">No</Button>
            </div>
        </Modal.Body>

        </Modal>
    );
};

export default DeletePayment
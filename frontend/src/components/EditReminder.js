import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { DOMAIN } from '../config'

const EditReminder = ({ show, handleClose, id, clientName, paymentAmount, paymentType, dueDate }) => {
   
   // State variables for payment reminder data
   const [newClientName, setNewClientName] = useState();  
   const [newPaymentType, setNewPaymentType] = useState();
   const [newPaymentAmount, setNewPaymentAmount] = useState();
   const [newDueDate, setNewDueDate] = useState();

   // State variables for error handling
   // TODO: 

   // State variables for enabling the submit button when there's no error
   // TODO:

   // Enable button when there are no more errors or vice versa
   // TODO:

   // Handle all inputs (there will be multiple of this)
   // TODO:

   // Displays the prefilled values of the input fields
   const setInitialValues = () => {
      setNewClientName(clientName)
      setNewPaymentType(paymentType)
      setNewPaymentAmount(paymentAmount)
      setNewDueDate(dueDate)
   }

   // Handles editing payment reminder from the database
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
            handleClose();
         } else {
            console.error('Failed to delete payment reminder:', response.statusText);
         }
      } catch (error) {
         console.error('Error deleting payment reminder:', error);
      }
   };

   // Handles editing payment reminder from the database
   const handleEditReminder = async () => {
      try {
         const response = await fetch(`${DOMAIN}/paymentReminder/update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
               clientName : newClientName,
               paymentType : newPaymentType,
               paymentAmount : newPaymentAmount,
               dueDate : newDueDate
            })
         });

         if (response.ok) {
            console.log('Payment reminder edited successfully');
            handleClose();
         } else {
            console.error('Failed to edit payment reminder:', response.statusText);
         }
      } catch (error) {
         console.error('Error editing payment reminder:', error);
      }
   };

   return(
      <Modal 
      show={show} 
      onShow={setInitialValues}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
         <Modal.Header>
            <Modal.Title>Edit Payment Reminder</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form className="mb-5">
            <h6>Edit Client Name</h6>
            <Form.Group className="pb-3" controlId="clientName">
            <Form.Control type="text" placeholder="Client Name" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} />
            </Form.Group>

            <h6>Edit Payment Amount</h6>
            <Form.Group className="pb-3" controlId="paymentAmount">
            <Form.Control type="text" placeholder="Payment Amount" value={newPaymentAmount} onChange={(e) => setNewPaymentAmount(e.target.value)} />
            </Form.Group>

            <h6>Edit Payment Type</h6>
            <Form.Group className="pb-3" controlId="paymentType">
               <Form.Select aria-label="Payment Type" value={newPaymentType} onChange={(e) => setNewPaymentType(e.target.value)} >
                  <option value="" disabled>Select payment type</option>
                  <option value="Incoming">Incoming Payment</option>
                  <option value="Outgoing">Outgoing Payment</option>
               </Form.Select>
            </Form.Group>

            <h6>Edit Due Date</h6>
            <Form.Group className="pb-3" controlId="dueDate">
            <Form.Control type="date" placeholder="Due Date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
            </Form.Group>

            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="danger" onClick={() => { handleClose(); handleDeleteReminder(); }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg></Button>
            <Button variant="secondary" onClick={handleClose} className="px-4 me-2"> Close</Button>
            <Button variant="danger" onClick={() => { handleClose(); handleEditReminder(); }} className="px-4">Save Reminder</Button>
        </Modal.Footer>
      </Modal>
   );
}

export default EditReminder;
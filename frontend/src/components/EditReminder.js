import { Form, Card, Button, Container, Row, Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { DOMAIN } from '../config'

const EditReminder = ({ show, handleClose }) => {
   
   // State variables for payment reminder data
   const [clientName, setClientName] = useState('');  
   const [paymentType, setPaymentType] = useState('');
   const [paymentAmount, setPaymentAmount] = useState('');
   const [dueDate, setDueDate] = useState('');

   // State variables for error handling
   // TODO: 

   // State variables for enabling the submit button when there's no error
   // TODO:

   // Enable button when there are no more errors or vice versa
   // TODO:

   // Handle all inputs (there will be multiple of this)
   // TODO:

   // Handles adding payment reminder to database
   const handleEditReminder = async () => {
      try {
         const response = await fetch(`${DOMAIN}/paymentReminder/create`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clientName, paymentType, paymentAmount, dueDate })
         });

         if (response.ok) {
            console.log('Payment reminder added successfully');
            handleClose();
         } else {
            console.error('Failed to add payment reminder:', response.statusText);
         }
      } catch (error) {
         console.error('Error adding payment reminder:', error);
      }
   };

   return(
      <Modal 
      show={show} onHide={handleClose}
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
            <Form.Control type="text" placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </Form.Group>

            <h6>Edit Payment Amount</h6>
            <Form.Group className="pb-3" controlId="paymentAmount">
            <Form.Control type="text" placeholder="Payment Amount" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
            </Form.Group>

            <h6>Edit Payment Type</h6>
            <Form.Group className="pb-3" controlId="paymentType">
               <Form.Select aria-label="Payment Type" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} >
                  <option value="" disabled>Select payment type</option>
                  <option value="incoming">Incoming Payment</option>
                  <option value="outgoing">Outgoing Payment</option>
               </Form.Select>
            </Form.Group>

            <h6>Edit Due Date</h6>
            <Form.Group className="pb-3" controlId="dueDate">
            <Form.Control type="date" placeholder="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </Form.Group>

            {/* <Form.Group className="pb-3" controlId="timeReminder">
               <Form.Select aria-label="Reminder every">
                  <option value="" disabled>Repeats every</option>
                  <option value="1">Hour</option>
                  <option value="2">Minute</option>
                  <option value="3">Day</option>
                  <option value="4">When you sleep</option>
                  <option value="5">When you wake up</option>
               </Form.Select>
            </Form.Group> */}
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="danger" onClick={handleClose}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
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
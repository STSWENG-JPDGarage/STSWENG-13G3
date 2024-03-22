import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { DOMAIN } from '../config'

const AddReminder = ({ show, handleClose }) => {
   
   // State variables for payment reminder data
   const [clientName, setClientName] = useState('');  
   const [paymentType, setPaymentType] = useState('');
   const [paymentAmount, setPaymentAmount] = useState('');
   const [dueDate, setDueDate] = useState('');

   // Display blank input fields
   const setInitialValues = () => {
      setClientName('')
      setPaymentType('')
      setPaymentAmount('')
      setDueDate('')
   }

   // Handles adding payment reminder to database
   const handleAddReminder = async () => {
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
      show={show} 
      onShow={setInitialValues}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
         <Modal.Header>
            <Modal.Title>Add Payment Reminder</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form className="mb-5">
            <h6>Client Name</h6>
            <Form.Group className="pb-3" controlId="clientName">
            <Form.Control type="text" placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </Form.Group>

            <h6>Payment Amount</h6>
            <Form.Group className="pb-3" controlId="paymentAmount">
            <Form.Control type="text" placeholder="Payment Amount" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
            </Form.Group>

            <h6>Payment Type</h6>
            <Form.Group className="pb-3" controlId="paymentType">
               <Form.Select aria-label="Payment Type" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} >
                  <option value="" disabled>Select payment type</option>
                  <option value="Incoming">Incoming Payment</option>
                  <option value="Outgoing">Outgoing Payment</option>
               </Form.Select>
            </Form.Group>

            <h6>Due Date</h6>
            <Form.Group className="pb-3" controlId="dueDate">
            <Form.Control type="date" placeholder="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </Form.Group>

            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} className="px-4 me-2"> Close</Button>
            <Button variant="danger" onClick={() => { handleClose(); handleAddReminder(); }} className="px-4">Add Reminder</Button>
        </Modal.Footer>
      </Modal>
   );
}

export default AddReminder;
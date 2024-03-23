import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { DOMAIN } from '../config'

const AddReminder = ({ show, handleClose }) => {
   
   // State variables for payment reminder data
   const [clientName, setClientName] = useState('');  
   const [paymentAmount, setPaymentAmount] = useState('');
   const [paymentType, setPaymentType] = useState('');
   const [dueDate, setDueDate] = useState('');

   // State variables for error messages
   const [errorClientName, setErrorClientName] = useState('');
   const [errorPaymentAmount, setErrorPaymentAmount] = useState('');
   const [errorPaymentType, setErrorPaymentType] = useState('');
   const [errorDueDate, setErrorDueDate] = useState('');

   // Display blank input fields
   const setInitialValues = () => {
      setClientName('');
      setPaymentType('');
      setPaymentAmount('');
      setDueDate('');
      setErrorClientName('');
      setErrorPaymentAmount('');
      setErrorPaymentType('');
      setErrorDueDate('');
   }

   // Validate input fields before adding the reminder
   const validateAllFields = () => {
      let isValidClientName = 1;
      let isValidPaymentAmount = 1;
      let isValidPaymentType = 1;
      let isValidDueDate = 1;
      setErrorClientName('');
      setErrorPaymentAmount('');
      setErrorPaymentType('');
      setErrorDueDate('');

      // Update validity of clientName
      if (clientName.trim() === '') {
         isValidClientName = 0;
         setErrorClientName('Client name is required.');
      }

      // Update validity of paymentAmount
      if (paymentAmount.trim() === '') {
         isValidPaymentAmount = 0;
         setErrorPaymentAmount('Payment amount is required.');
      } else if (isNaN(parseFloat(paymentAmount))) {
         isValidPaymentAmount = 0;
         setErrorPaymentAmount('Payment amount must be a valid number.');
      } else if (parseFloat(paymentAmount) < 0) {
         isValidPaymentAmount = 0;
         setErrorPaymentAmount('Payment amount cannot be negative.');     
      }

      // Update validity of paymentType
      if (paymentType.trim() === '') {
         isValidPaymentType = 0;
         setErrorPaymentType('Payment type is required.');  
      }

      // Update validity of dueDate
      if (dueDate === '') {
         isValidDueDate = 0;
         setErrorDueDate('Due date is required.');  
      } else {
         const currentDate = new Date();
         const selectedDate = new Date(dueDate);

         currentDate.setHours(0, 0, 0, 0);
         selectedDate.setHours(0, 0, 0, 0);
     
         if (selectedDate < currentDate) {
            isValidDueDate = 0;
            setErrorDueDate('Due date cannot be in the past.');
         }
      }

      // Add to database if everything is valid
      if (isValidClientName === 1 &&
         isValidPaymentType === 1 &&
         isValidPaymentAmount === 1 &&
         isValidDueDate === 1
      ){
         handleAddReminder();
         handleClose();
      }
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
            <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'> {errorClientName} </div>
            </Form.Group>

            <h6>Payment Amount</h6>
            <Form.Group className="pb-3" controlId="paymentAmount">
            <Form.Control type="text" placeholder="Payment Amount" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
            <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'> {errorPaymentAmount} </div>
            </Form.Group>

            <h6>Payment Type</h6>
            <Form.Group className="pb-3" controlId="paymentType">
               <Form.Select aria-label="Payment Type" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} >
                  <option value="" disabled>Select payment type</option>
                  <option value="Incoming">Incoming Payment</option>
                  <option value="Outgoing">Outgoing Payment</option>
               </Form.Select>
               <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'> {errorPaymentType} </div>
            </Form.Group>

            <h6>Due Date</h6>
            <Form.Group className="pb-3" controlId="dueDate">
            <Form.Control type="date" placeholder="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'> {errorDueDate} </div>
            </Form.Group>

            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} className="px-4 me-2"> Close</Button>
            <Button variant="danger" onClick={() => { validateAllFields(); }} className="px-4">Add Reminder</Button>
        </Modal.Footer>
      </Modal>
   );
}

export default AddReminder;
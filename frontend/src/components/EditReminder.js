import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { DOMAIN } from '../config'

const EditReminder = ({ show, handleClose, id, clientName, paymentAmount, paymentType, dueDate }) => {
   
   // State variables for payment reminder data
   const [newClientName, setNewClientName] = useState('');  
   const [newPaymentType, setNewPaymentType] = useState('');
   const [newPaymentAmount, setNewPaymentAmount] = useState('');
   const [newDueDate, setNewDueDate] = useState('');

   // State variables for storing whether the variables are currently valid
   const [isValidClientName, setIsValidClientName] = useState(0);
   const [isValidPaymentAmount, setIsValidPaymentAmount] = useState(0);
   const [isValidPaymentType, setIsValidPaymentType] = useState(0);
   const [isValidDueDate, setIsValidDueDate] = useState(0);

   // State variables for error messages
   const [errorClientName, setErrorClientName] = useState('');
   const [errorPaymentAmount, setErrorPaymentAmount] = useState('');
   const [errorPaymentType, setErrorPaymentType] = useState('');
   const [errorDueDate, setErrorDueDate] = useState('');

   // Display the prefilled values of the input fields and blank error messages
   const setInitialValues = () => {
      setNewClientName(clientName)
      setNewPaymentType(paymentType)
      setNewPaymentAmount(paymentAmount)
      setNewDueDate(formatDate(dueDate))
      setErrorClientName('');
      setErrorPaymentAmount('');
      setErrorPaymentType('');
      setErrorDueDate('');
   }

   // Validate client name on blur
   const validateClientName = () => {
      // Update validity of clientName
      if (newClientName.trim() === '') {
         setIsValidClientName(0);
         setErrorClientName('Client name is required.');
      }
      else {
         setIsValidClientName(1);
         setErrorClientName('');
      }
   }

   // Validate payment amount on blur
   const validatePaymentAmount = () => {
      if (String(newPaymentAmount).trim() === '') {
         setIsValidPaymentAmount(0);
         setErrorPaymentAmount('Payment amount is required.');
      } else if (isNaN(parseFloat(newPaymentAmount))) {
         setIsValidPaymentAmount(0);
         setErrorPaymentAmount('Payment amount must be a valid number.');
      } else if (parseFloat(newPaymentAmount) <= 0) {
         setIsValidPaymentAmount(0);
         setErrorPaymentAmount('Payment amount must be greater than 0.');     
      } else {
         setIsValidPaymentAmount(1);
         setErrorPaymentAmount('');           
      }
   }

   // Validate payment type on blur
   const validatePaymentType = () => {
      if (newPaymentType.trim() === '') {
         setIsValidPaymentType(0);
         setErrorPaymentType('Payment type is required.');  
      } else {
         setIsValidPaymentType(1);
         setErrorPaymentType('');  
      }
   }

   // Validate due date on blur
   const validateDueDate = () => {
      if (newDueDate === '') {
         setIsValidDueDate(0);
         setErrorDueDate('Due date is required.');  
      } else {
         const currentDate = new Date();
         const selectedDate = new Date(newDueDate);

         currentDate.setHours(0, 0, 0, 0);
         selectedDate.setHours(0, 0, 0, 0);

         if (selectedDate < currentDate) {
            setIsValidDueDate(0);
            setErrorDueDate('Due date cannot be in the past.');
         } else {
            setIsValidDueDate(1);
            setErrorDueDate('');           
         }
      }
   }

   // Validate input fields before saving the reminder
   const validateAllFields = () => {

      // Validate then update all error messages
      validateClientName();
      validatePaymentAmount();
      validatePaymentType();
      validateDueDate();

      // Save to database if everything is valid, otherwise do nothing
      if (isValidClientName === 1 &&
         isValidPaymentType === 1 &&
         isValidPaymentAmount === 1 &&
         isValidDueDate === 1
      ){
         handleEditReminder();
         handleClose();
      }
   }

   // Helper function to format date
   const formatDate = (dueDate) => {
      const date = new Date(dueDate);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10) {
            month = '0' + month;
      }
      let day = date.getDate();
      if (day < 10) {
            day = '0' + day;
      }
      return `${year}-${month}-${day}`;
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
            alert('Payment reminder successfully edited!')
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
            <Form.Control type="text" placeholder="Client Name" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} onBlur={validateClientName}/>
            <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'> {errorClientName} </div>
            </Form.Group>

            <h6>Edit Payment Amount</h6>
            <Form.Group className="pb-3" controlId="paymentAmount">
            <Form.Control type="text" placeholder="Payment Amount" value={newPaymentAmount} onChange={(e) => setNewPaymentAmount(e.target.value)} onBlur={validatePaymentAmount}/>
            <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'> {errorPaymentAmount} </div>
            </Form.Group>

            <h6>Edit Payment Type</h6>
            <Form.Group className="pb-3" controlId="paymentType">
               <Form.Select aria-label="Payment Type" value={newPaymentType} onChange={(e) => setNewPaymentType(e.target.value)} onBlur={validatePaymentType}>
                  <option value="" disabled>Select payment type</option>
                  <option value="Incoming">Incoming Payment</option>
                  <option value="Outgoing">Outgoing Payment</option>
               </Form.Select>
               <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'> {errorPaymentType} </div>
            </Form.Group>

            <h6>Edit Due Date</h6>
            <Form.Group className="pb-3" controlId="dueDate">
            <Form.Control type="date" placeholder="Due Date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} onBlur={validateDueDate}/>
            <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'> {errorDueDate} </div>
            </Form.Group>

            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="danger" onClick={() => { handleClose(); handleDeleteReminder(); alert('Payment reminder successfully deleted!');}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg></Button>
            <Button variant="secondary" onClick={handleClose} className="px-4 me-2"> Close</Button>
            <Button variant="danger" onClick={validateAllFields} className="px-4">Save Reminder</Button>
        </Modal.Footer>
      </Modal>
   );
}

export default EditReminder;
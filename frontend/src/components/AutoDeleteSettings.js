import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import {Button, Form } from 'react-bootstrap';
import { DOMAIN } from '../config'

const AutoDeleteSettings  = ({ show, handleClose }) => {

   // State variables for payment reminder data
   const [numOfDays, setNumOfDays] = useState();  

   // State variables for storing whether the variables are currently valid
   const [isValidNumOfDays, setIsValidNumOfDays] = useState(0);

   // State variables for error messages
   const [errorNumOfDays, setErrorNumOfDays] = useState('');
   
   const setInitialValues = () => {
      getLastAutoDelete();
      setIsValidNumOfDays(0);
      setErrorNumOfDays('');
   }

   // Handles getting the last auto-delete setting
   const getLastAutoDelete = async () => {
      try {
         // Fetch all notifications
         const response = await fetch(`${DOMAIN}/autoDelete/get`);
         if (!response.ok) {
            throw new Error('Failed to fetch the last auto-delete setting');
         }
         const autoDeletes = await response.json();
        
         // Sort auto-delete settings by _id in descending order
         autoDeletes.sort((a, b) => {
             return b._id - a._id;
         });
 
         // Get the last auto-delete setting
         const lastAutoDelete = autoDeletes[0];
         setNumOfDays(lastAutoDelete.numOfDays);
      } catch (error) {
         console.error('Error fetching last auto-delete setting:', error);
       }
   };

   // Validate numOfDays field on blur
   const validateField = () => {
      if (String(numOfDays).trim() === '') {
         setIsValidNumOfDays(0);
         setErrorNumOfDays('This field is required.');
      } else if (!Number.isInteger(Number(numOfDays))) {
         setIsValidNumOfDays(0);
         setErrorNumOfDays('Number of days must be an integer.');
      } else if (parseInt(numOfDays) <= 0) {
         setIsValidNumOfDays(0);
         setErrorNumOfDays('Number of days must be greater than 0.');     
      } else {
         setIsValidNumOfDays(1);
         setErrorNumOfDays('');           
      }
   }

   // Validate input fields before udpating the db
   const handleSubmit = () => {
      validateField();
      if (isValidNumOfDays === 1) {
         handleUpdateNumOfDays();
         alert('Number of days for automatic deletion of archived notifications has been updated!');
         handleClose();
      }
   }

   // Handles updating numOfDays from the database
   const handleUpdateNumOfDays = async () => {
      // TODO: Logic for updating the db
   }

   return(
      <Modal 
      show={show} 
      onShow={setInitialValues}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
         <div className='pt-4 pb-2 px-4'>
            <h1 className='txt-28'>Set Archive Auto-Delete</h1>
            <p className='txt-16'>Please specify a time frame for the automatic deletion of archived notifications after a certain number of days.</p>

            <Form.Group>
               <Form.Control 
                  type="number"
                  placeholder="Enter Number of Days"
                  value={numOfDays}
                  min="1"
                  step="1"
                  onChange={(e) => setNumOfDays(e.target.value)}
                  onBlur={validateField}
               />
            </Form.Group>
            <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'> {errorNumOfDays} </div>
         </div>
         <div className=' d-flex justify-content-end pe-4 pb-4 mt-3'>
            <Button className="px-4 me-2 bg-search-gray border-0 txt-black" onClick={handleClose}>Close</Button>
            <Button className="px-4 bg-main-dominant-red border-0" onClick={handleSubmit}>Apply</Button>
         </div>
      </Modal>
   );
};

export default AutoDeleteSettings;
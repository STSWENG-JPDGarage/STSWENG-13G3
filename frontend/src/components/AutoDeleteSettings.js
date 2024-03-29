import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import {Button, Form } from 'react-bootstrap';
import { DOMAIN } from '../config'

const AutoDeleteSettings  = ({ show, handleClose }) => {

   // State variables for auto-delete data
   const [numOfDays, setNumOfDays] = useState();  
   const [id, setId] = useState();
   const [isChecked, setIsChecked] = useState();

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
         // Fetch all auto-delete settings
         const response = await fetch(`${DOMAIN}/autoDelete/get`);
         if (!response.ok) {
            throw new Error('Failed to fetch the auto-delete settings');
         }
         const autoDeletes = await response.json();
        
         // Sort auto-delete settings by _id in descending order
         autoDeletes.sort((a, b) => {
            return Number(b._id) - Number(a._id);
         });
 
         // Get the last auto-delete setting
         const lastAutoDelete = autoDeletes[0];
         setId(lastAutoDelete._id);
         setNumOfDays(lastAutoDelete.numOfDays);
         
         if (lastAutoDelete.isEnabled === 'Yes') {
            setIsChecked(true);
         } else {
            setIsChecked(false);
         }

      } catch (error) {
         console.error('Error fetching last auto-delete settings:', error);
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
         updateAutoDelete();
      }
   }

   // Handles updating numOfDays from the database
   const updateAutoDelete = async () => {
      try {
         let isEnabled;
         if (isChecked === true) {
            isEnabled = "Yes";
         } else {
            isEnabled = "No";
         }
         const response = await fetch(`${DOMAIN}/autoDelete/update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
               numOfDays : numOfDays,
               lastUpdated : new Date(),
               isEnabled : isEnabled
            })
         });

         if (response.ok) {
            console.log('Auto delete settings edited successfully');
            alert('Auto delete settings of archived notifications has been updated!');
            handleClose();
         } else {
            console.error('Failed to edit auto delete settings:', response.statusText);
         }
      } catch (error) {
         console.error('Error editing auto delete settings:', error);
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
                  disabled={!isChecked}
                  style={isChecked === true ? { opacity: 1 } : { opacity: 0.5 }}
               />
            </Form.Group>
            <div className='ms-2 txt-main-dominant-red fst-italic fw-bold'> {errorNumOfDays} </div>
         </div>
         <div className='d-flex justify-content-center pb-4 mt-3'>
            <div className="form-check form-switch pe-4">
               <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="autoDeleteCheckbox" 
                  style={isChecked === true ? { color: '#FF5555'} : { }}
                  checked={isChecked} 
                  onChange={(e) => setIsChecked(e.target.checked)}/>
               <label className="form-check-label" htmlFor="autoDeleteCheckbox">Enable auto-deletion</label>
            </div>
            <div className='ps-5'>
               <Button className="px-4 me-2 bg-search-gray border-0 txt-black" onClick={handleClose}>Close</Button>
               <Button className="px-4 bg-main-dominant-red border-0" onClick={handleSubmit}>Apply</Button>
            </div>       
         </div>
      </Modal>
   );
};

export default AutoDeleteSettings;
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import {Button, Form } from 'react-bootstrap';

const AutoDeleteSettings  = ({ show, handleClose }) => {
   const [setInterval] = useState('3');

   const handleChange = (event) => {
     setInterval(event.target.value);
   };
   
return(
   
   <Modal 
   show={show} onHide={handleClose}
   size="md"
   aria-labelledby="contained-modal-title-vcenter"
   centered
   >
      <div className='pt-4 pb-2 px-4'>
         <h1 className='txt-28'>Set Archive Auto-Delete</h1>
         <p className='txt-16'>Please specify a time frame for the automatic deletion of archived notifications after a certain number of days.</p>
      
         <Form.Group className="pb-3">
               <Form.Select aria-label="Payment Type">
                  <option value="">Every -- Days</option>
                  <option value="">???</option>
                  <option value="">???</option>
               </Form.Select>
            </Form.Group>
      </div>
      <div className=' d-flex justify-content-end pe-4 pb-4'>
         <Button className="px-4 me-2 bg-search-gray border-0 txt-black"> Close</Button>
         <Button className="px-4 bg-main-dominant-red border-0">Apply</Button>
      </div>
   </Modal>

);
};

export default AutoDeleteSettings;
import { Form, Card, Button, Container, Row, Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';

const AddPaymentReminder = ({ show, handleClose }) => {

   return(
      <Modal 
      show={show} onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
         <Modal.Header>
            <Modal.Title>Add Payment Reminder</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form className="mb-5">
            <Form.Group className="pb-3" controlId="supplierName">
            <Form.Control type="text" placeholder="Supplier Name" />
            </Form.Group>

            <Form.Group className="pb-3" controlId="dateDue">
            <Form.Control type="text" placeholder="Date Due" />
            </Form.Group>

            <Form.Group className="pb-3" controlId="paymentAmount">
            <Form.Control type="text" placeholder="Payment Amount" />
            </Form.Group>

            <Form.Group className="pb-3" controlId="timeReminder">
               <Form.Select aria-label="Reminder every">
                  <option value="" disabled>Repeats every</option>
                  <option value="1">Hour</option>
                  <option value="2">Minute</option>
                  <option value="3">Day</option>
                  <option value="4">When you sleep</option>
                  <option value="5">When you wake up</option>
               </Form.Select>
            </Form.Group>
         </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} className="px-4 me-2"> Close</Button>
            <Button variant="danger" onClick={handleClose} className="px-4">Add Reminder</Button>
        </Modal.Footer>
      </Modal>
   );
}

export default AddPaymentReminder;
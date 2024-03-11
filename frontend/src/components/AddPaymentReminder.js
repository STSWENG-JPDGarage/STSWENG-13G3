import { Form, Card, Button, Container, Row, Col} from 'react-bootstrap'


const AddPaymentReminder = () => {

   return(
      <>
      <Card>
      <Card.Header className="fw-bold">Add Payment Reminder</Card.Header>
      <Card.Body>
      
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

   <Container>
      <Row>
         <Col className="d-flex justify-content-end">
          <Button variant="secondary" className="px-4 me-4" size="lg">Close</Button>
          <Button variant="danger" className="px-4 me-5" size="lg">Add Reminder</Button>
        </Col>
      </Row>
   </Container>


      </Card.Body>
   </Card>
      </>
   )
}

export default AddPaymentReminder
import Toast from 'react-bootstrap/Toast';
import {Row, Col} from 'react-bootstrap'
import CloseButton from 'react-bootstrap/CloseButton';


const Notification = () => {
  return (
    <Toast className='bg_card2-red'>
      <Toast.Body>
        <Row>
          <Col sm={10}><p className='txt-16 fw-bold'>Alpinestars SMX-1 Drystar Gloves</p></Col>
          <Col sm={2} className='d-flex justify-content-end'><CloseButton /></Col>
        </Row>
        <Row ><p className='txt-14'>A customer has just placed an order for thi...</p></Row>
        <Row>
          <Col><p>2 hours ago</p></Col>
          <Col className='d-flex justify-content-end pe-3'><img src="icon_cart_.png" className="w-25"/></Col>
        </Row>
      </Toast.Body>
    </Toast>
  );
};

export default Notification;
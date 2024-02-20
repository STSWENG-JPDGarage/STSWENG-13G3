import Toast from 'react-bootstrap/Toast';
import {Row, Col} from 'react-bootstrap'
import CloseButton from 'react-bootstrap/CloseButton';


const Notification = () => {
  return (
    <Toast>
      <Toast.Body>
        <Row>
          <Col><p className='txt-16 fw-bold'>Alpinestars SMX-1 Drystar Gloves</p></Col>
          <Col class='w-auto'><CloseButton /></Col>
          
        </Row>
        <Row><p className='txt-14'>A customer has just placed an order for thi...</p></Row>
        <Row>
          <Col><p>2 hours ago</p></Col>
          <Col class='w-auto'><img src="icon_cart_.png"/></Col>
        </Row>
      </Toast.Body>
    </Toast>
  );
};

export default Notification;
import Toast from 'react-bootstrap/Toast';
import {Row, Col} from 'react-bootstrap'
import CloseButton from 'react-bootstrap/CloseButton';


const Notification = ({ message, stockRemaining, timeElapsed }) => {
  return (
    <Toast className='bg_card2-red'>
      <Toast.Body>
        <Row>
          <Col sm={10}><p className='txt-16 fw-bold'>{message}</p></Col>
          <Col sm={2} className='d-flex justify-content-end'><CloseButton /></Col>
        </Row>
        <Row ><p className='txt-14'>Stock remaining: {stockRemaining}</p></Row>
        <Row>
          <Col><p>{timeElapsed}</p></Col>
          <Col className='d-flex justify-content-end pe-3'><img src="icon_cart_.png" className="w-25"/></Col>
        </Row>
      </Toast.Body>
    </Toast>
  );
};

export default Notification;
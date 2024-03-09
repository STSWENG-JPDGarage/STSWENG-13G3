import Toast from 'react-bootstrap/Toast';
import {Row, Col} from 'react-bootstrap'
import CloseButton from 'react-bootstrap/CloseButton';


const Notification = ({ message, stockRemaining, timeElapsed, isArchive, onClose }) => {

  let stockStatus;
  if (stockRemaining > 0 && stockRemaining <= 10) {
    stockStatus = `Danger Zone`;
  } else if (stockRemaining === 0) {
    stockStatus = 'Out of Stock';
  }

  return (
    <Toast className='bg_card2-red'>
      <Toast.Body>
        <Row>
          <Col sm={10}><p className='txt-16 fw-bold'>ITEM STOCK ALERT</p></Col>
          <Col sm={2} className='d-flex justify-content-end'><CloseButton onClick={onClose}/></Col>
        </Row>
        <Row><p className='txt-14'>Item <b>{message}</b> is currently at <b>{stockStatus}</b> status with <b>{stockRemaining}</b> {stockRemaining === 1 ? 'stock' : 'stocks'} remaining.</p></Row>
        <Row>
          <Col><p>{timeElapsed}</p></Col>
          <Col className='d-flex justify-content-end pe-3'><img src="icon_cart_.png" className="w-25"/></Col>
        </Row>
      </Toast.Body>
    </Toast>
  );
};

export default Notification;
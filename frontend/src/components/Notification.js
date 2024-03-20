import Toast from 'react-bootstrap/Toast';
import {Row, Col} from 'react-bootstrap'
import CloseButton from 'react-bootstrap/CloseButton';

// Helper function to calculate date difference the form the title
const getTitle = (dueDate) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const midnightDueDate = new Date(dueDate);
  midnightDueDate.setHours(0, 0, 0, 0);

  const differenceInTime = midnightDueDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays === 1) {
    return `PAYMENT DUE IN 1 DAY`;
  } else if (differenceInDays === -1) {
    return `PAYMENT DUE 1 DAY AGO`;
  } else if (differenceInDays > 0) {
    return `PAYMENT DUE IN ${differenceInDays} DAYS`;
  } else if (differenceInDays < 0) {
    return `PAYMENT DUE ${Math.abs(differenceInDays)} DAYS AGO`;
  } else {
    return `PAYMENT DUE TODAY`;
  }
};

// Helper function to format date into words
const formatDateToWords = (dueDate) => {
  const date = new Date(dueDate);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

// Helper function to reformat numbers into PHP currency with comma/s
const formatToPHP = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
};

const StockNotification = ({ itemName, stockRemaining, timeElapsed, isArchive, onClose }) => {

  let stockStatus;
  if (stockRemaining > 0 && stockRemaining <= 10) {
    stockStatus = `Danger Zone`;
  } else if (stockRemaining === 0) {
    stockStatus = 'Out of Stock';
  }

  return (
    <Toast className={isArchive === "No" ? 'bg-background-red' : 'bg-white'}>
      <Toast.Body>
        <Row>
          <Col sm={10}><p className='txt-16 fw-bold'>ITEM STOCK ALERT</p></Col>
          <Col sm={2} className='d-flex justify-content-end'><CloseButton onClick={onClose}/></Col>
        </Row>
        <Row><p className='txt-14'>Item <b>{itemName}</b> is currently at <b>{stockStatus}</b> status with <b>{stockRemaining}</b> {stockRemaining === 1 ? 'stock' : 'stocks'} remaining.</p></Row>
        <Row>
          <Col><p>{timeElapsed}</p></Col>
          <Col className='d-flex justify-content-end pe-3'><img src="icon_cart_.png" className="w-25"/></Col>
        </Row>
      </Toast.Body>
    </Toast>
  );
};

const PaymentNotification = ({ clientName, paymentType, paymentAmount, dueDate, timeElapsed, isArchive, onClose }) => {

  return (
    <Toast className={isArchive === "No" ? 'bg-background-red' : 'bg-white'}>
      <Toast.Body>
        <Row>
          <Col sm={10}><p className='txt-16 fw-bold'>{getTitle(dueDate)}</p></Col>
          <Col sm={2} className='d-flex justify-content-end'><CloseButton onClick={onClose}/></Col>
        </Row>
        <Row><p className='txt-14'>An {paymentType === "Outgoing" ? 'outgoing' : 'incoming'} payment {paymentType === "Outgoing" ? 'to' : 'from'} <b>{clientName}</b> for <b>{formatToPHP(paymentAmount)}</b> is due on <b>{formatDateToWords(dueDate)}</b>.</p></Row>
        <Row>
          <Col><p>{timeElapsed}</p></Col>
          <Col className='d-flex justify-content-end pe-3'><img src="icon_cart_.png" className="w-25"/></Col>
        </Row>
      </Toast.Body>
    </Toast>
  );
};

export { StockNotification, PaymentNotification };
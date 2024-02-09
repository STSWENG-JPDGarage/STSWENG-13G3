import Toast from 'react-bootstrap/Toast';
import Stack from 'react-bootstrap/Stack';

function Notification() {
  return (
    <Toast>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      
      <Stack direction="horizontal" gap={2}>
      <strong className="me-auto">Alpinestars SMX-1 Drystar Gloves</strong>
      <img></img> //X icon here
      </Stack>
      
      <Stack direction="horizontal" gap={2}>
      <small>A customer has just placed an order for thi...</small>
      </Stack>

      <Stack direction="horizontal" gap={2}>
      <small>11 mins ago</small>
      <img src></img>
      </Stack>
    </Toast>
  );
}

export default Notification;
import {Container} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Notification from '../components/Notification';


const NotificationPanel = () => {
  return (
    <Container className='bg-white py-4'>
      <Tabs
      defaultActiveKey="Updates"
      id="uncontrolled-tab-example"
      className="mb-3 my-0 h-100"
      justify>
      <Tab eventKey="updates" title="Updates">
      <Notification/>
      <Notification/>
      <Notification/>
      <Notification/>
      <Notification/>
      <Notification/>
      </Tab>
      <Tab eventKey="archive" title="Archive">
        <Notification/>
      </Tab>
    </Tabs>
    </Container>
  );
};

export default NotificationPanel;
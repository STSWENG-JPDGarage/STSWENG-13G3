import {Container, Badge} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Notification from '../components/Notification';
import { DOMAIN } from '../config'
import React, { useState, useEffect } from 'react';

const NotificationPanel = () => {
  // BACKEND for fetching notifications
  const [nonArchiveNotifications, setNonArchiveNotifications] = useState([]);
  const [archiveNotifications, setArchiveNotifications] = useState([]);
  const [nonArchiveNotificationCount, setNonArchiveNotificationCount] = useState(0);
  const [archiveNotificationCount, setArchiveNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${DOMAIN}/notification/notifications-get`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const notificationsData = await response.json();
      const nonArchiveNotifications = notificationsData.filter(notification => notification.isArchive === "No");
      const archiveNotifications = notificationsData.filter(notification => notification.isArchive === "Yes");
      setNonArchiveNotifications(nonArchiveNotifications);
      setNonArchiveNotificationCount(nonArchiveNotifications.length);
      setArchiveNotifications(archiveNotifications);
      setArchiveNotificationCount(archiveNotifications.length);      
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // FRONTEND for notification panel
  return (
    <Container className='bg-white py-4'>
      <Tabs
      defaultActiveKey="Updates"
      id="uncontrolled-tab-example"
      className="mb-3 my-0 h-100"
      justify>
      <Tab eventKey="updates" title={<span>Updates <Badge>{nonArchiveNotificationCount}</Badge></span>}>
        {nonArchiveNotifications.map((notification, index) => (
          <Notification key={index} message={notification.message} stockRemaining={notification.stockRemaining}/>
        ))}
      </Tab>
      <Tab eventKey="archive" title={<span>Archive <Badge>{archiveNotificationCount}</Badge></span>}>
        {archiveNotifications.map((notification, index) => (
          <Notification key={index} message={notification.message} stockRemaining={notification.stockRemaining}/>
        ))}
      </Tab>
    </Tabs>
    </Container>
  );
};

export default NotificationPanel;
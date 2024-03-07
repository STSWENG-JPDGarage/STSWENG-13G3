import {Container, Badge} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Notification from '../components/Notification';
import { DOMAIN } from '../config'
import React, { useState, useEffect } from 'react';

const NotificationPanel = () => {
  // BACKEND for fetching notifications
  const [nonArchiveNotificationCount, setNonArchiveNotificationCount] = useState(0);
  const [archiveNotificationCount, setArchiveNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotificationsCount();
  }, []);

  const fetchNotificationsCount = async () => {
    try {
      const response = await fetch(`${DOMAIN}/notification/notifications-get`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const notifications = await response.json();
      const nonArchiveNotifications = notifications.filter(notification => notification.isArchive === "No");
      const archiveNotifications = notifications.filter(notification => notification.isArchive === "Yes");
      setNonArchiveNotificationCount(nonArchiveNotifications.length);
      setArchiveNotificationCount(archiveNotifications.length);
    } catch (error) {
      console.error('Error fetching notifications count:', error);
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
      <Notification/>
      <Notification/>
      <Notification/>
      <Notification/>
      <Notification/>
      <Notification/>
      </Tab>
      <Tab eventKey="archive" title={<span>Archive <Badge>{archiveNotificationCount}</Badge></span>}>
        <Notification/>
      </Tab>
    </Tabs>
    </Container>
  );
};

export default NotificationPanel;
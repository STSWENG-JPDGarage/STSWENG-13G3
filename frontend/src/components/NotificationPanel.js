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

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${DOMAIN}/notification/notifications-get`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const notificationsData = await response.json(); // Sort notifications (most recent first)
      notificationsData.sort((a, b) => new Date(b.date) - new Date(a.date));
      const nonArchiveNotifications = notificationsData.filter(notification => notification.isArchive === "No");
      const archiveNotifications = notificationsData.filter(notification => notification.isArchive === "Yes");
      setNonArchiveNotifications(nonArchiveNotifications);
      setArchiveNotifications(archiveNotifications);  
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Function to format time elapsed of notification
  const formatTimeElapsed = (notificationDate) => {
    const currentTime = new Date();
    const timeDifference = currentTime - new Date(notificationDate);
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
      return 'Just now';
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
      <Tab eventKey="updates" title={<span>Updates <Badge>{nonArchiveNotifications.length}</Badge></span>}>
        {nonArchiveNotifications.map((notification, index) => (
          <Notification 
            key={index} 
            message={notification.message} 
            stockRemaining={notification.stockRemaining}
            timeElapsed={formatTimeElapsed(notification.date)}
          />
        ))}
      </Tab>
      <Tab eventKey="archive" title={<span>Archive <Badge>{archiveNotifications.length}</Badge></span>}>
        {archiveNotifications.map((notification, index) => (
          <Notification 
            key={index} 
            message={notification.message} 
            stockRemaining={notification.stockRemaining}
            timeElapsed={formatTimeElapsed(notification.date)}
            />
        ))}
      </Tab>
    </Tabs>
    </Container>
  );
};

export default NotificationPanel;
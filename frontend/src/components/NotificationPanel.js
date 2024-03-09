import {Container, Badge} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Notification from '../components/Notification';
import { DOMAIN } from '../config'
import React, { useState, useEffect } from 'react';

const NotificationPanel = () => {
  const [nonArchiveNotifications, setNonArchiveNotifications] = useState([]);
  const [archiveNotifications, setArchiveNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetches all non-archive and archive notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${DOMAIN}/notification/notifications-get`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const notificationsData = await response.json(); 
      notificationsData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort notifications (most recent first)
      const nonArchiveNotifications = notificationsData.filter(notification => notification.isArchive === "No");
      const archiveNotifications = notificationsData.filter(notification => notification.isArchive === "Yes");
      setNonArchiveNotifications(nonArchiveNotifications);
      setArchiveNotifications(archiveNotifications);  
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Format "time elapsed" of the notification
  const formatTimeElapsed = (notificationDate) => {
    const currentTime = new Date();
    const timeDifference = currentTime - new Date(notificationDate);
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (years > 0) {
      return years === 1 ? '1 year ago' : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? '1 month ago' : `${months} months ago`;
    } else if (weeks > 0) {
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else if (days > 0) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
      return 'Just now';
    }
  };

  const handleCloseNotification = async (notificationId, currentIsArchive) => {
    try {
      const updatedIsArchive = currentIsArchive === 'Yes' ? 'No' : 'Yes'; // Toggle isArchive status
      const response = await fetch(`${DOMAIN}/notification/notifications-update/${notificationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isArchive: updatedIsArchive }) // Update isArchive status
      });
      if (!response.ok) {
        throw new Error('Failed to close notification');
      }
      // Refetch notifications after closing
      fetchNotifications();
    } catch (error) {
      console.error('Error closing notification:', error);
    }
  };

  // FRONTEND for notification panel
  return (
    <Container className='bg-white py-4'>
      <Tabs
      defaultActiveKey="updates"
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
            isArchive={notification.isArchive}
            onClose={() => handleCloseNotification(notification._id, notification.isArchive)}
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
            isArchive={notification.isArchive}
            onClose={() => handleCloseNotification(notification._id, notification.isArchive)}
            />
        ))}
      </Tab>
    </Tabs>
    </Container>
  );
};

export default NotificationPanel;
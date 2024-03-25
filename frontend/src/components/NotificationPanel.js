import { Container, Badge } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { StockNotification, PaymentNotification } from '../components/Notification';
import { DOMAIN } from '../config'
import React, { useState, useEffect } from 'react';

const NotificationPanel = () => {
  const [nonArchiveNotifications, setNonArchiveNotifications] = useState([]);
  const [archiveNotifications, setArchiveNotifications] = useState([]);
  const [countNonArchive, setCountNonArchive] = useState(0);
  const [countArchive, setCountArchive] = useState(0);

  // Mimic live-updates by fetching notifications every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Filters and divides the fetched notifications based on user.role and isArchive respectively
  const fetchNotifications = async () => {
    try {
      // Get user details
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) { 

        // Fetch all notifications
        const response = await fetch(`${DOMAIN}/notification/get`);
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const notificationsData = await response.json(); 
        notificationsData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort notifications (most recent first)

        // Filter notifications based on user.role then assign notifications to archive and nonArchive
        let nonArchive;
        let archive;
        if (user.role === 'Admin') {
          nonArchive = notificationsData.filter(notification => notification.isArchive === "No");
          archive = notificationsData.filter(notification => notification.isArchive === "Yes");
        } else if (user.role === 'Secretary') {
          nonArchive = notificationsData.filter(notification => {return notification.isArchive === "No" && notification.notificationType === "Payment"});
          archive = notificationsData.filter(notification => {return notification.isArchive === "Yes" && notification.notificationType === "Payment"});
        } else if (user.role === 'Partsman') {
          nonArchive = notificationsData.filter(notification => {return notification.isArchive === "No" && notification.notificationType === "Stock"});
          archive = notificationsData.filter(notification => {return notification.isArchive === "Yes" && notification.notificationType === "Stock"});
        }
        setNonArchiveNotifications(nonArchive);
        setArchiveNotifications(archive);  
        setCountNonArchive(nonArchive.length)
        setCountArchive(archive.length)
      }
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
    } else if (weeks > 1) {
      return `${weeks} weeks ago`;
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
      const response = await fetch(`${DOMAIN}/notification/update-isArchive/${notificationId}`, {
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
      <Tab eventKey="updates" title={<span>Updates <Badge>{countNonArchive}</Badge></span>}>
        {countNonArchive > 0 && nonArchiveNotifications.map((notification, index) => (
          <div key={index}>
            {notification.notificationType === 'Stock' && (
              <StockNotification 
                itemName={notification.itemName} 
                stockRemaining={notification.stockRemaining}
                timeElapsed={formatTimeElapsed(notification.date)}
                isArchive={notification.isArchive}
                onClose={() => handleCloseNotification(notification._id, notification.isArchive)}
              />
            )}
            {notification.notificationType === 'Payment' && (
              <PaymentNotification 
                clientName={notification.clientName} 
                paymentType={notification.paymentType}
                paymentAmount={notification.paymentAmount}
                dueDate={notification.dueDate}
                timeElapsed={formatTimeElapsed(notification.date)}
                isArchive={notification.isArchive}
                onClose={() => handleCloseNotification(notification._id, notification.isArchive)}
              />
            )}
          </div>
        ))}
      </Tab>
      <Tab eventKey="archive" title={<span>Archive <Badge>{countArchive}</Badge></span>}>
        {countArchive > 0 && archiveNotifications.map((notification, index) => (
          <div key={index}>
            {notification.notificationType === 'Stock' && (
              <StockNotification 
                itemName={notification.itemName} 
                stockRemaining={notification.stockRemaining}
                timeElapsed={formatTimeElapsed(notification.date)}
                isArchive={notification.isArchive}
                onClose={() => handleCloseNotification(notification._id, notification.isArchive)}
              />
            )}
            {notification.notificationType === 'Payment' && (
              <PaymentNotification 
                clientName={notification.clientName} 
                paymentType={notification.paymentType}
                paymentAmount={notification.paymentAmount}
                dueDate={notification.dueDate}
                timeElapsed={formatTimeElapsed(notification.date)}
                isArchive={notification.isArchive}
                onClose={() => handleCloseNotification(notification._id, notification.isArchive)}
              />
            )}
          </div>
        ))}
      </Tab>
      </Tabs>
    </Container>
  );
};

export default NotificationPanel;
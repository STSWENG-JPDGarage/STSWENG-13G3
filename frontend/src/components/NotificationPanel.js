import { Container, Badge } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { StockNotification, PaymentNotification } from '../components/Notification';
import { DOMAIN } from '../config'
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import AutoDeleteSettings from './AutoDeleteSettings';
import ArchiveWarning from './ArchiveWarning';


const NotificationPanel = () => {
  const [nonArchiveNotifications, setNonArchiveNotifications] = useState([]);
  const [archiveNotifications, setArchiveNotifications] = useState([]);
  const [countNonArchive, setCountNonArchive] = useState(0);
  const [countArchive, setCountArchive] = useState(0);

  const [modalShowWarning, setModalShowWarning] = useState(false);
  const [modalShowSettings, setModalShowSettings] = useState(false);
  const [isUpdatesTab, setIsUpdatesTab] = useState(true);
  const [nonArchiveAmount, setNonArchiveAmount] = useState(10);   // amount of notifs to be displayed
  const [archiveAmount, setArchiveAmount] = useState(10);         // amount of notifs to be displayed

  const handleCloseWarning = () => setModalShowWarning(false);
  const handleCloseSettings = () => setModalShowSettings(false);
  const handleShowWarning = () => setModalShowWarning(true);
  const handleShowSettings = () => setModalShowSettings(true);

  const handleSelect = (key) => {
    if (key === 'updates'){
      setIsUpdatesTab(true);
    } else {
      setIsUpdatesTab(false);
    }
  }

  // Mimic live-updates by fetching notifications every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 500);

    return () => clearInterval(intervalId);
  }, [archiveAmount, nonArchiveAmount]);

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

        let active;      // notifications where isDeleted === "No"
        let filtered;    // notifications filtered by user.role
        let nonArchive;  // notifications where isArchive === "No"
        let archive;     // notifications where isArchive === "Yes"

        // Filter by isDeleted
        active = notificationsData.filter(notification => notification.isDeleted === "No");

        // Filter by user.role
        if (user.role === 'Admin') {
          filtered = active;
        } else if (user.role === 'Secretary') {
          filtered = active.filter(notification => notification.notificationType === "Payment");
        } else if (user.role === 'Partsman') {
          filtered = active.filter(notification => notification.notificationType === "Stock");
        }

        // Sort by most recent first THEN group to nonArchive and archive
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        nonArchive = filtered.filter(notification => notification.isArchive === "No");
        archive = filtered.filter(notification => notification.isArchive === "Yes");

        // Count the number of notifications
        setCountNonArchive(nonArchive.length);
        setCountArchive(archive.length);

        // Cut the number of notifications to be shown
        nonArchive = nonArchive.slice(0, nonArchiveAmount);
        archive = archive.slice(0, archiveAmount);
        setNonArchiveNotifications(nonArchive);
        setArchiveNotifications(archive);  
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
      const currentDate = new Date();
      const updatedIsArchive = currentIsArchive === 'Yes' ? 'No' : 'Yes'; // Toggle isArchive status
      const updatedIsArchiveDate = currentIsArchive === 'Yes' ? null : currentDate;
      const response = await fetch(`${DOMAIN}/notification/update-isArchive/${notificationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isArchive: updatedIsArchive, isArchiveDate: updatedIsArchiveDate }) // Update isArchive status
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
  <Container fluid className='bg-white pt-2 pb-0 notification_panel'>
    <div className='d-flex justify-content-between p-1 pb-2'>
      <h1 className='txt-20 fw-bold'>Notification</h1>
      <div>
        <Button className='bg-white p-0 border-0 m-0'><img src="filter.png" className="icon_md pe-2"/></Button>
        <Button className='bg-white p-0 border-0 m-0' onClick={() => isUpdatesTab===true ? handleShowWarning() : handleShowSettings() }><img src="delete_options.png" className="icon_md pe-1"/></Button>             
      </div>
      <ArchiveWarning show={modalShowWarning} handleClose={handleCloseWarning} />
      <AutoDeleteSettings show={modalShowSettings} handleClose={handleCloseSettings} />
    </div>
    <Tabs
      onSelect={handleSelect}
      defaultActiveKey="updates"
      id="uncontrolled-tab-example"
      className=" my-0 tabs-full-height"
      justify>
      <Tab eventKey="updates" className='tab-content-scrollable' title={<span style={{ color: isUpdatesTab !== true ? '#FF5555' : '' }}>Updates <Badge bg="main-dominant-red">{countNonArchive}</Badge></span>}>
        {countNonArchive > 0 && nonArchiveNotifications.map((notification, index) => (
          <div key={index} className='py-1'>
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
        {countNonArchive > 10 && 
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px', marginBottom: '20px' }}>
            <p className={nonArchiveAmount > 10 ? "txt-main-dominant-red" : "txt-main-dominant-black"}
              style={{ 
                textDecoration: 'underline',  
                cursor: 'pointer', 
                pointerEvents: nonArchiveAmount > 10 ? 'auto' : 'none',
                opacity: nonArchiveAmount > 10 ? 1 : 0.5 }} 
              onClick={() => { setNonArchiveAmount(nonArchiveAmount - 10); fetchNotifications() }}>See Less</p>
            <p className={countNonArchive > nonArchiveAmount ? "txt-main-dominant-red" : "txt-main-dominant-black"}
              style={{ 
                textDecoration: 'underline',  
                cursor: 'pointer', 
                pointerEvents: countNonArchive > nonArchiveAmount ? 'auto' : 'none',
                opacity: countNonArchive > nonArchiveAmount ? 1 : 0.5 }} 
              onClick={() => { setNonArchiveAmount(nonArchiveAmount + 10); fetchNotifications() }}>See More</p>
          </div>
        }
      </Tab>
      <Tab eventKey="archive" className='tab-content-scrollable' title={<span style={{ color: isUpdatesTab !== false ? '#FF5555' : '' }}>Archive <Badge bg="main-dominant-red">{countArchive}</Badge></span>}>
        {countArchive > 0 && archiveNotifications.map((notification, index) => (
          <div key={index} className='py-1'>
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
        {countArchive > 10 && 
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px', marginBottom: '20px' }}>
            <p className={archiveAmount > 10 ? "txt-main-dominant-red" : "txt-main-dominant-black"}
              style={{ 
                textDecoration: 'underline',  
                cursor: 'pointer', 
                pointerEvents: archiveAmount > 10 ? 'auto' : 'none',
                opacity: archiveAmount > 10 ? 1 : 0.5 }} 
              onClick={() => { setArchiveAmount(archiveAmount - 10); fetchNotifications() }}>See Less</p>
            <p className={countArchive > archiveAmount ? "txt-main-dominant-red" : "txt-main-dominant-black"}
              style={{ 
                textDecoration: 'underline',  
                cursor: 'pointer', 
                pointerEvents: countArchive > archiveAmount ? 'auto' : 'none',
                opacity: countArchive > archiveAmount ? 1 : 0.5 }} 
              onClick={() => { setArchiveAmount(archiveAmount + 10); fetchNotifications() }}>See More</p>
          </div>
        }
      </Tab>
      </Tabs>
      <div className='d-flex justify-content-end pe-3 pt-1'>
        <a href="#" className='txt-main-dominant-red'>See More</a>
      </div>
  </Container>
  );
};

export default NotificationPanel;
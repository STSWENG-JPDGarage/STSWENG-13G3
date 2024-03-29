const fetch = require('node-fetch');
const DOMAIN = "http://localhost:4000"

const PaymentNotificationScheduler = async () => {
    try {
        // Fetch all payment reminders
        const response = await fetch(`${DOMAIN}/paymentReminder/get`);
        if (!response.ok) {
            throw new Error('Failed to fetch payment reminders');
        }
        const paymentRemindersData = await response.json(); 

        // Filter payment reminders (dueDate is at most 7 days away)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const filteredPayments = paymentRemindersData.filter(paymentReminder => {
            const dueDate = new Date(paymentReminder.dueDate);
            dueDate.setHours(0, 0, 0, 0);

            const differenceInTime = dueDate.getTime() - currentDate.getTime();
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
            return differenceInDays <= 7;
        });

        // Sort payment reminders (reversed logic of: nearest dueDate, outgoing over incoming)
        filteredPayments.sort((a, b) => {
            const dueDateComparison = new Date(b.dueDate) - new Date(a.dueDate);
            if (dueDateComparison !== 0) {
                return dueDateComparison;
            } else {
                if (a.paymentType === 'Outgoing' && b.paymentType !== 'Outgoing') {
                    return 1;
                } else if (b.paymentType === 'Outgoing' && a.paymentType !== 'Outgoing') {
                    return -1;
                } else {
                    return 0;
                }
            }
        });

        // Handles creating notification for filtered payments (dueDate is at most 7 days away)
        filteredPayments.forEach(async payment => {
            try {
                const response = await fetch(`${DOMAIN}/notification/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        notificationType: 'Payment', 
                        isArchive: 'No', 
                        isArchiveDate: null,
                        paymentId: payment._id, 
                        clientName: payment.clientName,
                        paymentType: payment.paymentType,
                        paymentAmount: payment.paymentAmount,
                        dueDate: payment.dueDate
                    })
                });
        
                if (response.ok) {
                    console.log('Notification created successfully for payment:', payment._id);
                } else {
                    console.error('Failed to create notification for payment:', payment._id, response.statusText);
                }
            } catch (error) {
                console.error('Error creating notification for payment:', payment._id, error);
            }
        });
    } catch (error) {
        console.error('Error fetching payment reminders:', error);
    }
};

const AutoDeleteScheduler = async () => {
    try {
    // FETCH all auto-delete settings
        const response = await fetch(`${DOMAIN}/autoDelete/get`);
        if (response.ok) {
            console.log('Auto delete settings successfully fetched');
        } else {
            console.error('Failed to fetch auto-delete settings', response.statusText);
        }
        const autoDeletes = await response.json();
      
        // Sort auto-delete settings by _id in descending order
        autoDeletes.sort((a, b) => {
            return Number(b._id) - Number(a._id);
        });

        if (autoDeletes[0].isEnabled == "Yes") {
            
            // Get the numOfDays from the last auto-delete setting
            const days = autoDeletes[0].numOfDays;

            // FETCH all archived notifications
            const response2 = await fetch(`${DOMAIN}/notification/get`);
            if (response2.ok) {
                console.log('Notifications successfully fetched');
            } else {
                console.error('Failed to fetch notifications', response2.statusText);
            }
            const notifications = await response2.json();
            const archivedNotifications = notifications.filter(notification => notification.isArchive === "Yes");

            // Get current date
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            // Set isDeleted = "Yes" if currentDate - isArchiveDate >= days
            archivedNotifications.forEach(async (archivedNotification) => {
                const isArchiveDate = new Date(archivedNotification.isArchiveDate);
                isArchiveDate.setHours(0, 0, 0, 0);

                const differenceInTime = currentDate.getTime() - isArchiveDate.getTime();
                const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

                if (differenceInDays >= days) {
                    // UPDATE isDeleted fields of the database
                    const response3 = await fetch(`${DOMAIN}/notification/update-isDeleted/${archivedNotification._id}`, {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ isDeleted : "Yes" })
                    }); 
                    if (response3.ok) {
                        console.log('Archived notification successfully deleted');
                    } else {
                        console.error('Failed to delete archived notification', response3.statusText);
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error in auto-deleting archived notifications:', error);
    }
};

module.exports = { PaymentNotificationScheduler, AutoDeleteScheduler };
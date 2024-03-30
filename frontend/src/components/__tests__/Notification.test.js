import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NotificationPanel from '../NotificationPanel';
import '@testing-library/jest-dom';


const mockNotifications = [
  {
    "_id": {
      "$oid": "65dc71d506d7e05344f48692"
    },
    "stockRemaining": 0,
    "isArchive": "No",
    "itemId": {
      "$oid": "655089395b805b1f00f97619"
    },
    "date": {
      "$date": "2024-02-26T11:11:17.451Z"
    },
    "itemName": "Item 16",
    "notificationType": "Stock",
    "isDeleted": "No"
  },
  {
    "_id": {
      "$oid": "6603a938db285065bc7bd8e7"
    },
    "paymentId": {
      "$oid": "660303f63a793fadb0643145"
    },
    "clientName": "CSARCH2 Client",
    "paymentType": "Incoming",
    "paymentAmount": 3513,
    "dueDate": {
      "$date": "2024-03-28T00:00:00.000Z"
    },
    "notificationType": "Payment",
    "isArchive": "Yes",
    "discriminator": "PaymentNotification",
    "date": {
      "$date": "2024-03-27T05:06:00.412Z"
    },
    "__v": 0,
    "isDeleted": "No"
  }
];



  



describe('NotificationPanel', () => {

  beforeAll(() => {
    // Mock localStorage for authenticated user
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ role: 'Admin' }));

    // Mock fetch call
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(mockNotifications);
        },
      })
    );
  });

  afterAll(() => {
    global.fetch.mockRestore();
    Storage.prototype.getItem.mockRestore();
  });

  test('renders payment and stock notifications', async () => {
    render(<NotificationPanel/>);
    
    await waitFor(() => {
      return screen.getByText('CSARCH2 Client');
    });

    expect(screen.getByText('CSARCH2 Client')).toBeInTheDocument();

    screen.debug();

    //render(<PaymentNotification/>);

    // expect(screen.getByText('ITEM STOCK ALERT')).toBeInTheDocument(); // Item name
    // expect(screen.getByText(/7/)).toBeInTheDocument(); // Stock remaining
    // expect(screen.getByText('Stock')).toBeInTheDocument(); // Notification type for stock

    // expect(screen.getByText('Test Client')).toBeInTheDocument(); // Client name for payment
    // expect(screen.getByText('Incoming')).toBeInTheDocument(); // Payment type
    // expect(screen.getByText('₱3,513.00')).toBeInTheDocument(); // Formatted payment amount, assuming your component formats the number
    // expect(screen.getByText(/March 28, 2024/)).toBeInTheDocument(); // Due date, assuming the component formats the date
    


  });
});

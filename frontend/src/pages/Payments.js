import { Container, Card } from 'react-bootstrap'
import SalesPaymentsOption from '../components/SalesPaymentsOption';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import React from 'react';
import AddReminder from '../components/AddReminder';
import EditReminder from '../components/EditReminder';
import DeletePayment from '../components/DeletePayment';
import { useState, useEffect } from 'react';
import { DOMAIN } from '../config'

const Payments = () => {
    // State variables for payment reminder data
    const [incomingPayments, setIncomingPayments] = useState([]);
    const [outgoingPayments, setOutgoingPayments] = useState([]);
    const [closestPaymentReminder, setClosestPaymentReminder] = useState([]);

    // State variables for payment reminder data to be edited
    const [editId, setEditId] = useState([]);
    const [editClientName, setEditClientName] = useState([]);
    const [editPaymentAmount, setEditPaymentAmount] = useState([]);
    const [editPaymentType, setEditPaymentType] = useState([]);
    const [editDueDate, setEditDueDate] = useState([]);

    // State variables for frontend design
    const [modalShowAdd, setModalShowAdd] = useState(false);
    const [modalShowEdit, setModalShowEdit] = useState(false);
    const [modalShowDelete, setModalShowDelete] = useState(false);
    
    const handleCloseAdd = () => setModalShowAdd(false);
    const handleCloseEdit = () => setModalShowEdit(false);
    const handleShowAdd = () => setModalShowAdd(true);
    const handleShowEdit = () => setModalShowEdit(true);
    const handleCloseDelete = () => setModalShowDelete(false);
    const handleShowDelete = () => setModalShowDelete(true);

    // Mimic live-updates by fetching payment reminders every second
    useEffect(() => {
        const intervalId = setInterval(() => {
          fetchPaymentReminders();
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, []);

    // Helper function to calculate date difference
    const getDueDateMessage = (dueDate) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const midnightDueDate = new Date(dueDate);
        midnightDueDate.setHours(0, 0, 0, 0);

        const differenceInTime = midnightDueDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        if (differenceInDays === 1) {
            return `Due in 1 day (${midnightDueDate.toLocaleDateString()})`;
        } else if (differenceInDays === -1) {
            return `Due 1 day ago (${midnightDueDate.toLocaleDateString()})`;
        } else if (differenceInDays > 0) {
            return `Due in ${differenceInDays} days (${midnightDueDate.toLocaleDateString()})`;
        } else if (differenceInDays < 0) {
            return `Due ${Math.abs(differenceInDays)} days ago (${midnightDueDate.toLocaleDateString()})`;
        } else {
            return `Due today (${midnightDueDate.toLocaleDateString()})`;
        }
    };

    // Helper function to reformat numbers into PHP currency with comma/s
    const formatToPHP = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    // Fetches all incoming and outgoing payment reminders
    const fetchPaymentReminders = async () => {
        try {
            const response = await fetch(`${DOMAIN}/paymentReminder/get-nondue`);
            if (!response.ok) {
                throw new Error('Failed to fetch payment reminders');
            }
                const paymentRemindersData = await response.json(); 
                
                // Sort by dueDate
                paymentRemindersData.sort((a, b) => {
                    const dateComparison = new Date(a.dueDate) - new Date(b.dueDate);
                    if (dateComparison === 0) {
                        // If due dates are the same, sort by paymentType (outgoing before incoming)
                        if (a.paymentType === "Outgoing" && b.paymentType === "Incoming") {
                            return -1; // Sort a before b (outgoing before incoming)
                        } else if (a.paymentType === "Incoming" && b.paymentType === "Outgoing") {
                            return 1; // Sort b before a (outgoing before incoming)
                        } else {
                            return 0; // Preserve the original order
                        }
                    }
                    return dateComparison; // Sort by due date
                });

                // set closest payment reminder
                if (paymentRemindersData.length > 0) {
                    const closestPaymentReminder = paymentRemindersData[0];
                    setClosestPaymentReminder(closestPaymentReminder);
                } else {
                    setClosestPaymentReminder(null); // Set closest payment reminder to null if array is empty
                }

                // Set incoming and outgoing payments
                const incomingPayments = paymentRemindersData.filter(paymentReminder => paymentReminder.paymentType === "Incoming");
                const outgoingPayments = paymentRemindersData.filter(paymentReminder => paymentReminder.paymentType === "Outgoing");
                setIncomingPayments(incomingPayments);
                setOutgoingPayments(outgoingPayments);  
        } catch (error) {
            console.error('Error fetching payment reminders:', error);
        }
    };

    return (
    <>
        <Container className='main'>
            <SalesPaymentsOption />
            <Card className='p-4'>
                <div className="d-flex justify-content-between">
                <h1 className='fw-bold txt-subtitle-red txt-24'>Next Payment Due</h1>
                <Button className="px-4 txt-main-dominant-red bg-white border-0 shadow"><img className="icon_sm" src="icon_danger.png"></img> CLICK TO SEE OVERDUE PAYMENTS</Button>
                </div>
                
                <Card className='txt-24 fw-bold bg-main-dominant-red py-3 px-4 txt-white shadow-sm border-0'>
                    {incomingPayments.length === 0 && outgoingPayments.length === 0 ? (
                        <div className='d-flex justify-content-between'>
                            <div>      
                                <p className='txt-36 my-0'>No pending payments.</p>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex justify-content-between'>
                            <div>
                                <p className='txt-20 my-0'>{getDueDateMessage(closestPaymentReminder.dueDate)}</p>
                                <p className='txt-36 my-0'>{closestPaymentReminder.clientName}</p>
                            </div>
                                <Card className='bg-background-red txt-payment-dark-green m-1 p-2 px-3 txt-36 rounded'>
                                    <p>{formatToPHP(closestPaymentReminder.paymentAmount)}</p>
                                </Card>
                        </div>
                    )}
                </Card>

                <div className='d-flex justify-content-between'>
                    <div className='w-50 me-1'>
                    <p className='txt-16 fw-bold mb-1 mt-2'>{incomingPayments.length === 1 ? '1 Incoming Payment' : `${incomingPayments.length} Incoming Payments`}</p>
                        <ListGroup as="ol" numbered>
                            {incomingPayments.map((paymentReminder, index) => (
                                <ListGroup.Item
                                    key={index}
                                    as="li"
                                    className="d-flex justify-content-between align-items-start bg-background-red pb-0 fw-bold txt-20 fw-bold mb-2 border-0 rounded"
                                >
                                    <div className="ms-2 me-auto txt-14 fw-semibold">
                                    <div className="fw-bold txt-20 fw-bold">{paymentReminder.clientName}</div>
                                    {formatToPHP(paymentReminder.paymentAmount)}
                                    <p className='txt-gray-text txt-10 mb-2'>{getDueDateMessage(paymentReminder.dueDate)}</p>
                                    </div>
                                    <Button onClick={() => {
                                        handleShowEdit(); 
                                        setEditId(paymentReminder._id);
                                        setEditClientName(paymentReminder.clientName);
                                        setEditPaymentAmount(paymentReminder.paymentAmount);
                                        setEditPaymentType(paymentReminder.paymentType);
                                        setEditDueDate(paymentReminder.dueDate);
                                    }} className='rounded-full border-0 bg-icon-in-the-background py-0'><img src="edit_white.png" className='icon_sm'/></Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                    <div className='w-50 ms-1'>
                    <p className='txt-16 fw-bold mb-1 mt-2'>{outgoingPayments.length === 1 ? '1 Outgoing Payment' : `${outgoingPayments.length} Outgoing Payments`}</p>
                        <ListGroup as="ol" numbered>
                            {outgoingPayments.map((paymentReminder, index) => (
                                <ListGroup.Item
                                    key={index}
                                    as="li"
                                    className="d-flex justify-content-between align-items-start bg-background-red pb-0 fw-bold txt-20 fw-bold mb-2 border-0 rounded"
                                >
                                    <div className="ms-2 me-auto txt-14 fw-semibold">
                                    <div className="fw-bold txt-20 fw-bold">{paymentReminder.clientName}</div>
                                    {formatToPHP(paymentReminder.paymentAmount)}
                                    <p className='txt-gray-text txt-10 mb-2'>{getDueDateMessage(paymentReminder.dueDate)}</p>
                                    </div>
                                    <Button onClick={() => {
                                        handleShowEdit(); 
                                        setEditId(paymentReminder._id);
                                        setEditClientName(paymentReminder.clientName);
                                        setEditPaymentAmount(paymentReminder.paymentAmount);
                                        setEditPaymentType(paymentReminder.paymentType);
                                        setEditDueDate(paymentReminder.dueDate);
                                    }} className='rounded-full border-0 bg-icon-in-the-background py-0'><img src="edit_white.png" className='icon_sm'/></Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </div>
                <div className='d-flex justify-content-end mt-4'>
                    <Button variant="primary" onClick={handleShowAdd} className='w-25 bg-background-red border-0 txt-black fw-bold txt-16'><img src="bell.png" className='icon_sm pe-2'/>Add New Reminder</Button>
                    <AddReminder show={modalShowAdd} handleClose={handleCloseAdd} />
                    <EditReminder 
                        show={modalShowEdit} 
                        handleClose={handleCloseEdit} 
                        handleShowDelete={handleShowDelete}
                        id={editId}
                        clientName={editClientName}
                        paymentAmount={editPaymentAmount}
                        paymentType={editPaymentType}
                        dueDate={editDueDate}
                    />
                    <DeletePayment 
                        show={modalShowDelete} 
                        handleClose={handleCloseDelete}
                        handleCloseEdit={handleCloseEdit} 
                        id={editId}
                    />
                </div>
            </Card>
        </Container>
    </>
    )
}

export default Payments
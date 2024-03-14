import { Container, Card, Row, Col } from 'react-bootstrap'
import SalesPaymentsOption from '../components/SalesPaymentsOption';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import React from 'react';
import AddReminder from '../components/AddReminder';
import { useState, useEffect } from 'react';
import { DOMAIN } from '../config'


const Payments = () => {
    // State variables for payment reminder data
    const [incomingPayments, setIncomingPayments] = useState([]);
    const [outgoingPayments, setOutgoingPayments] = useState([]);

    // State variables for frontend design
    const [modalShow, setModalShow] = useState(false);

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    // Mimic live-updates by fetching payment reminders every second
    useEffect(() => {
        const intervalId = setInterval(() => {
          fetchPaymentReminders();
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, []);

    // Fetches all incoming and outgoing payment reminders
    const fetchPaymentReminders = async () => {
        try {
            const response = await fetch(`${DOMAIN}/paymentReminder/paymentReminders-get`);
            if (!response.ok) {
                throw new Error('Failed to fetch payment reminders');
            }
                const paymentRemindersData = await response.json(); 
                paymentRemindersData.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)); // Sort notifications (most recent first)
                const incomingPayments = paymentRemindersData.filter(paymentReminder => paymentReminder.paymentType === "incoming");
                const outgoinPayments = paymentRemindersData.filter(paymentReminder => paymentReminder.paymentType === "outgoing");
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
                <h1 className='fw-bold txt-subtitle-red txt-24'>Next Payment Due</h1>
                <Card className='txt-24 fw-bold bg-main-dominant-red py-3 px-4 txt-white shadow-sm border-0'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <p className='txt-20 my-0'>Due in 2 days:</p>
                            <p className='txt-36 my-0'>Arai Helmets Philippines</p>
                        </div>
                            <Card className='bg-background-red txt-payment-dark-green m-1 p-2 px-3 txt-36 rounded'>
                                <p>₱44,697.13</p>
                            </Card>
                    </div>
                </Card>

                <div className='d-flex justify-content-between'>
                    <div className='w-50 me-1'>
                        <p className='txt-16 fw-bold mb-1 mt-2'>Incoming Payments</p>
                        <ListGroup as="ol" numbered>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start bg-background-red pb-0 fw-bold txt-20 fw-bold mb-2 border-0 rounded"
                        >
                            <div className="ms-2 me-auto txt-14 fw-semibold">
                            <div className="fw-bold txt-20 fw-bold">Juan Dela Cruz</div>
                            ₱7,579.29
                            <p className='txt-gray-text txt-10 mb-2'>In 6 days (09/20/2023)</p>
                            </div>
                            <Button className='rounded-full border-0 bg-icon-in-the-background py-0'><img src="edit_white.png" className='icon_sm'/></Button>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start bg-background-red pb-0 fw-bold txt-20 fw-bold mb-2 border-0 rounded"
                        >
                            <div className="ms-2 me-auto txt-14 fw-semibold">
                            <div className="fw-bold txt-20 fw-bold">Juan Dela Cruz</div>
                            ₱7,579.29
                            <p className='txt-gray-text txt-10 mb-2'>In 6 days (09/20/2023)</p>
                            </div>
                            <Button className='rounded-full border-0 bg-icon-in-the-background py-0'><img src="edit_white.png" className='icon_sm'/></Button>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start bg-background-red pb-0 fw-bold txt-20 fw-bold mb-2 border-0 rounded"
                        >
                            <div className="ms-2 me-auto txt-14 fw-semibold">
                            <div className="fw-bold txt-20 fw-bold">Juan Dela Cruz</div>
                            ₱7,579.29
                            <p className='txt-gray-text txt-10 mb-2'>In 6 days (09/20/2023)</p>
                            </div>
                            <Button className='rounded-full border-0 bg-icon-in-the-background py-0'><img src="edit_white.png" className='icon_sm'/></Button>
                        </ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className='w-50 ms-1'>
                    <p className='txt-16 fw-bold mb-1 mt-2'>Outgoing Payments</p>
                        <ListGroup as="ol" numbered>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start bg-background-red pb-0 fw-bold txt-20 fw-bold mb-2 border-0 rounded"
                        >
                            <div className="ms-2 me-auto txt-14 fw-semibold">
                            <div className="fw-bold txt-20 fw-bold">Juan Dela Cruz</div>
                            ₱7,579.29
                            <p className='txt-gray-text txt-10 mb-2'>In 6 days (09/20/2023)</p>
                            </div>
                            <Button className='rounded-full border-0 bg-icon-in-the-background py-0'><img src="edit_white.png" className='icon_sm'/></Button>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start bg-background-red pb-0 fw-bold txt-20 fw-bold mb-2 border-0 rounded"
                        >
                            <div className="ms-2 me-auto txt-14 fw-semibold">
                            <div className="fw-bold txt-20 fw-bold">Juan Dela Cruz</div>
                            ₱7,579.29
                            <p className='txt-gray-text txt-10 mb-2'>In 6 days (09/20/2023)</p>
                            </div>
                            <Button className='rounded-full border-0 bg-icon-in-the-background py-0'><img src="edit_white.png" className='icon_sm'/></Button>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start bg-background-red pb-0 fw-bold txt-20 fw-bold mb-2 border-0 rounded"
                        >
                            <div className="ms-2 me-auto txt-14 fw-semibold">
                            <div className="fw-bold txt-20 fw-bold">Juan Dela Cruz</div>
                            ₱7,579.29
                            <p className='txt-gray-text txt-10 mb-2'>In 6 days (09/20/2023)</p>
                            </div>
                            <Button className='rounded-full border-0 bg-icon-in-the-background py-0'><img src="edit_white.png" className='icon_sm'/></Button>
                        </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
                <div className='d-flex justify-content-end mt-4'>
                    <Button variant="primary" onClick={handleShow} className='w-25 bg-background-red border-0 txt-black fw-bold txt-16'><img src="bell.png" className='icon_sm pe-2'/>Add New Reminder</Button>

                    <AddReminder show={modalShow} handleClose={handleClose} />
                </div>
            </Card>
        </Container>
    </>
    )
}

export default Payments
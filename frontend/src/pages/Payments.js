import { Container, Card, Row, Col } from 'react-bootstrap'
import SalesPaymentsOption from '../components/SalesPaymentsOption';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import React from 'react';
import AddReminder from '../components/AddReminder';
import { useState } from 'react';


const Payments = () => {
    const [modalShow, setModalShow] = useState(false);

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

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
                            <card className='bg-background-red txt-payment-dark-green m-1 p-2 px-3 txt-36 rounded'>
                                <p>₱44,697.13</p>
                            </card>
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
                    <Button className='w-25 bg-background-red border-0 txt-black fw-bold txt-16'><img src="bell.png" className='icon_sm pe-2'/>Add New Reminder</Button>
                </div>
            </Card>
        </Container>
    </>
    )
}

export default Payments
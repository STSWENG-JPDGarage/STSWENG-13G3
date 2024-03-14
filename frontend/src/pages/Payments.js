import { Container, Card } from 'react-bootstrap'
import { Container, Card, Row, Col } from 'react-bootstrap'
import SalesPaymentsOption from '../components/SalesPaymentsOption';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
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
            <Card>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3 my-4"
                    >
                    <Tab eventKey="incoming" title="Incoming" className='mb-4'>
                        <Row className='m-4'>
                            <Col className='me-4'>
                                <Card className='txt-24 fw-bold bg-main-dominant-red py-3 px-4 txt-white shadow-sm border-0'>
                                    <p>No Payments Due <br/>Today</p>
                                </Card>

                                <p className='txt-24 txt-subtitle-red fw-bold mt-3 mb-0'>Upcoming Payments</p>
                                <p className='txt-16 fw-bold'>Next week</p>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-end'>
                                    <p className='bg-background-red txt-black rounded-full px-2 txt-20 fw-bold'>Total: ₱4,224.13</p>
                                </div>

                                <p className='txt-24 txt-subtitle-red fw-bold mb-0'>2 Payments Due This Week</p>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-end'>
                                    <p className='bg-background-red txt-black rounded-full px-2 txt-20 fw-bold'>Total: ₱4,224.13</p>
                                </div>

                            </Col>
                            <Col>
                                <Card className=' bg-main-dominant-red py-2 px-4 txt-white shadow-sm border-0'>
                                    <p className='txt-20 fw-bold'>Two Payment Due Tommorow</p>
                                    <Row className='p-0 m-0 d-flex justify-between'>
                                        <Col className='txt-16 fw-bold'>
                                            <p>Shell Lorem</p>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col className='bg-background-red rounded-full txt-black px-2 m-0'>
                                                    <p className='m-0 txt-12 text-center'>₱7,579.29</p>
                                                </Col>
                                                <Col>
                                                    <img src="edit_white.png" className='icon_sm'/> 
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='p-0 m-0 d-flex justify-between'>
                                        <Col className='txt-16 fw-bold'>
                                            <p>Shell Lorem</p>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col className='bg-background-red rounded-full txt-black px-2 m-0'>
                                                    <p className='m-0 txt-12 text-center'>₱7,579.29</p>
                                                </Col>
                                                <Col>
                                                    <img src="edit_white.png" className='icon_sm'/> 
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row >
                                    <div className='d-flex justify-content-end'>
                                        <p className='bg-background-red txt-black rounded-full px-2 txt-20 fw-bold'>Total: ₱4,224.13</p>
                                    </div>


                                </Card>
                                <p className='txt-16 mt-3 fw-bold'>Later this month</p>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-end'>
                                    <p className='bg-background-red txt-black rounded-full px-2 txt-20 fw-bold'>Total: ₱4,224.13</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-center mx-5'>
                            <Button variant="primary" onClick={handleShow} className='bg-background-red border-0 txt-black shadow-sm fw-bold py-2'>Add New Reminder</Button>

                            <AddReminder show={modalShow} handleClose={handleClose} />
                        </Row>
                    </Tab>
                    <Tab eventKey="outgoing" title="Outgoing" className='mb-4'>
                    <Row className='m-4'>
                            <Col className='me-4'>
                                <Card className='txt-24 fw-bold bg-main-dominant-red py-3 px-4 txt-white shadow-sm border-0'>
                                    <p>No Payments Due <br/>Today</p>
                                </Card>

                                <p className='txt-24 txt-subtitle-red fw-bold mt-3 mb-0'>Upcoming Payments</p>
                                <p className='txt-16 fw-bold'>Next week</p>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-end'>
                                    <p className='bg-background-red txt-black rounded-full px-2 txt-20 fw-bold'>Total: ₱4,224.13</p>
                                </div>

                                <p className='txt-24 txt-subtitle-red fw-bold mb-0'>2 Payments Due This Week</p>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-end'>
                                    <p className='bg-background-red txt-black rounded-full px-2 txt-20 fw-bold'>Total: ₱4,224.13</p>
                                </div>

                            </Col>
                            <Col>
                                <Card className=' bg-main-dominant-red py-2 px-4 txt-white shadow-sm border-0'>
                                    <p className='txt-20 fw-bold'>Two Payment Due Tommorow</p>
                                    <Row className='p-0 m-0 d-flex justify-between'>
                                        <Col className='txt-16 fw-bold'>
                                            <p>Shell Lorem</p>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col className='bg-background-red rounded-full txt-black px-2 m-0'>
                                                    <p className='m-0 txt-12 text-center'>₱7,579.29</p>
                                                </Col>
                                                <Col>
                                                    <img src="edit_white.png" className='icon_sm'/> 
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='p-0 m-0 d-flex justify-between'>
                                        <Col className='txt-16 fw-bold'>
                                            <p>Shell Lorem</p>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col className='bg-background-red rounded-full txt-black px-2 m-0'>
                                                    <p className='m-0 txt-12 text-center'>₱7,579.29</p>
                                                </Col>
                                                <Col>
                                                    <img src="edit_white.png" className='icon_sm'/> 
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row >
                                    <div className='d-flex justify-content-end'>
                                        <p className='bg-background-red txt-black rounded-full px-2 txt-20 fw-bold'>Total: ₱4,224.13</p>
                                    </div>


                                </Card>
                                <p className='txt-16 mt-3 fw-bold'>Later this month</p>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={9} className='d-flex justify-content-start align-middle'>
                                        <Row>
                                            <Col className='fw-bold txt-16'>
                                                <p className='py-0 my-0'>Shell Lorem</p>
                                            </Col>
                                            <Col className='txt-12 py-0'>
                                                <p className='txt-white bg-finances-positive rounded-full px-2 me-4 text-center'>09/20/2023</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>
                                        <Row>
                                            <Col >
                                                <p className='py-0 txt-12'>₱7,579.29</p>
                                            </Col>
                                            <Col className='p-0 m-0'>
                                                <img src="edit_black.png" className='icon_sm'/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-end'>
                                    <p className='bg-background-red txt-black rounded-full px-2 txt-20 fw-bold'>Total: ₱4,224.13</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-center mx-5'>
                            <Button variant="primary" onClick={handleShow} className='bg-background-red border-0 txt-black shadow-sm fw-bold py-2'>Add New Reminder</Button>

                            <AddReminder show={modalShow} handleClose={handleClose} />
                        </Row>
                    </Tab>
                </Tabs>
            </Card>
        </Container>
    </>
    )
}
export default Payments
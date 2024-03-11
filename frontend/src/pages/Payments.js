import { Container, Card } from 'react-bootstrap'
import SalesPaymentsOption from '../components/SalesPaymentsOption';
import AddPaymentReminder from '../components/AddPaymentReminder';

const Payments = () => {


    return (
    <>
        <Container className='main'>
            <SalesPaymentsOption />
            <Card>
            <AddPaymentReminder />
            </Card>
        </Container>
    </>
    )
}

export default Payments
import SalesGraph from "./SalesGraph";
import SalesRank from "./SalesRank";
import SalesQuota from "./SalesQuota";
import { useAuthContext } from '../hooks/useAuthContext.js'
import { DOMAIN } from '../config'
import { useState, useEffect } from 'react'

const reportPeriod = "Daily";

const DailyReport = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthContext()

    const fetchOrders = async () => {

        const response = await fetch(`${DOMAIN}/orders/day`, {
            method: "POST",
            body: JSON.stringify({ date: new Date() }), // convert to json
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        // check if the status is not OK
        if (!response.ok) {
            // throw new Error(`HTTP error! status: ${response.status}`);
            return 
        }

        // deserialize json to js object
        const json = await response.json()

        console.log("I AM JSON IN DAILY", json)

        setOrders(json)

    }
    useEffect(() => {
        // if (user) {
        // if (orders.length !== 0) {
        fetchOrders()

        if (orders) {
            setIsLoading(true)
        }
        // }
        // }
    }, [user])

    return (
        <>
            <SalesGraph period={reportPeriod} />
            {/* <SalesQuota period={reportPeriod} /> */}

            <SalesRank period={reportPeriod} orderItem={orders} isLoading={isLoading} />
            {/* {orders && orders.map((inventoryItem) => (
                <SalesRank
                    key={inventoryItem._id}
                    orderItem={inventoryItem._id}
                />
            ))} */}

        </>
    )
}

export default DailyReport
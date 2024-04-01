require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const inventoryRoutes = require('./routes/inventory')
const verifiedUserRoutes = require('./routes/verified-users')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')
const paymentReminderRoutes = require('./routes/paymentReminder')
const notificationRoutes = require('./routes/notification')
const autoDeleteRoutes = require('./routes/autoDelete')
const cron = require('node-cron');
const { PaymentNotificationScheduler, AutoDeleteScheduler } = require('./scheduler');
const corsMiddleware = require('./middleware/cors');






// express app
const app = express()

app.use(corsMiddleware);

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/users', verifiedUserRoutes)
app.use('/inventory', inventoryRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)
app.use('/paymentReminder', paymentReminderRoutes)
app.use('/notification', notificationRoutes)
app.use('/autoDelete', autoDeleteRoutes)

let MONGO_URI = ""

const temp = ""

if (temp === "production") {
    MONGO_URI = process.env.MONGO_URI
} else {
    MONGO_URI = process.env.MONGO_URI_DEV
}

// connect to the db
// mongoose.connect(process.env.MONGO_URI)
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('connected to database')

        // start the scheduler
        cron.schedule('0 0 * * *', () => {
            console.log('Running scheduled task...');
            PaymentNotificationScheduler();
            AutoDeleteScheduler();
        });

        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    });

    app.use("/", (req, res) => {
        res.send("Server is running.")
        res.json({ message: "test"});
    });

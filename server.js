require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('connected', () => console.log('Connected to database'));

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers');
const salesforceAuthRouter = require('./routes/salesforceAuth');
const vipAuthRouter = require('./routes/vipAuth');


app.use('/subscribers', subscribersRouter);
app.use('/salesforceAuth', salesforceAuthRouter);
app.use('/salesforceAuth', vipAuthRouter);

app.listen(3000, () => console.log('Server Started'))
const express = require('express')
const schedule = require('node-schedule')
const app = express()
const moment = require('moment')
const send = require('./slack/index')
const location = require('./api/location')
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', async(req, res) => {
    const text = req.query.text
    await location()
    // send(text)
    res.send(text)
})

app.post('/', (req, res) => {
    res.sendStatus(200)
    send(`${req.body.message}, ${moment().format('YYYY MM DD hh:mm:ss')}`)
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`, )
})


const testJob = schedule.scheduleJob('10 * * * * *', () => {
    // send(`Test, ${moment().format('YYYY MM DD hh:mm:ss')}`)
    
})

const morningJob = schedule.scheduleJob({hour: 8, minute: 0, second: 5, dayOfWeek: [1,2,3,4,5]}, () => {
    send(`Good morning!, ${moment().format('YYYY MM DD hh:mm:ss')}`)
})
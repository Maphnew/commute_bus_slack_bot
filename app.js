const express = require('express')
const schedule = require('node-schedule')
const app = express()
const send = require('./slack/index')
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
    const text = req.query.text
    send(text)
    res.send(text)
})

app.post('/', (req, res) => {
    console.log(req.body)
    let payload = req.body
    res.sendStatus(200)

    if(payload.event.type === 'app_mention') {
        if(payload.event.text.includes("bus")) {
            send('Success!')
        }
    }

    if(payload.event.type === "message"){
        console.log('Message')
    }
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

const rule = new schedule.RecurrenceRule();

const job = schedule.scheduleJob({hour: 8, minute: 0, second: 5, dayOfWeek: [1,2,3,4,5]}, () => {
    console.log('schedule test')
    send('Schedule Test, It is 8:00 AM')
})
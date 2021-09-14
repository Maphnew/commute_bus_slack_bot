const { default: axios } = require('axios')
const express = require('express')
const schedule = require('node-schedule')
const app = express()
const qs = require('qs');
const moment = require('moment')
const send = require('./slack/index')
const PORT = process.env.PORT || 3000
const SLACK_ACCESS_TOKEN = process.env.SLACK_ACCESS_TOKEN

app.use(express.json())


let message = {
    token: SLACK_ACCESS_TOKEN,
    channel: 'bus',
    text: 'test'
}

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

    axios.post('https://slack.com/api/chat.postMessage', qs.stringify(message))
})



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`, )
})


// const job = schedule.scheduleJob({hour: 8, minute: 0, second: 5, dayOfWeek: [1,2,3,4,5]}, () => {
//     console.log('schedule test')
//     send('Schedule Test, It is 8:00 AM')
// })

const testJob = schedule.scheduleJob({hour: 21, minute: 0, second: 0, dayOfWeek: [1,2,3,4,5]}, () => {
    message.text = `TEST, 08:00:05 AM, ${moment().format('YYYY MM DD hh:mm:ss')}`
    axios.post('https://slack.com/api/chat.postMessage', qs.stringify(message))
})

const morningJob = schedule.scheduleJob({hour: 8, minute: 0, second: 5, dayOfWeek: [1,2,3,4,5]}, () => {
    message.text = `TEST, 08:00:05 AM, ${moment().format('YYYY MM DD hh:mm:ss')}`
    axios.post('https://slack.com/api/chat.postMessage', qs.stringify(message))
})
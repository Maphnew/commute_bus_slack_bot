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
    res.send(text)
})

app.post('/', (req, res) => {
    res.sendStatus(200)
    send(`${req.body.message}, ${moment().format('YYYY MM DD hh:mm:ss')}`)
})

app.post('/slack/message', (req, res) => {
    res.send(req.body.challenge)
    send(`${req.body.message}`)
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`, )
})
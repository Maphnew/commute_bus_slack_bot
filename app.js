const express = require('express')
const app = express()
const send = require('./slack/index')
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
    const text = req.query.text
    send(text)
    res.send(text)
})

app.post('/bus', (req, res) => {
    console.log(req.body)
    let payload = req.body
    res.sendStatus(200)

    if(payload.event.type === 'app_mention') {
        if(payload.event.text.includes("bus")) {
            send('Success!')
        }
    }
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
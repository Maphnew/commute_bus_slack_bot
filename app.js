const express = require('express')
const app = express()
const send = require('./slack/index')
const location = require('./api/location')
const stations = require('./api/stations.json')
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', async(req, res) => {
    const text = req.query.text
    res.send(text)
})

app.post('/', async(req, res) => {
    res.sendStatus(200)
    const bodyType = req.body.type
    const eventType = req.body.event.type
    const eventText = req.body.event.text
    const stationList = stations.response.msgBody.busRouteStationList.map(station => {
        return `\n${station.stationSeq}. ${station.stationName}`; 
    })
    if(bodyType === 'event_callback' && eventType === "message") {
        if(eventText.includes('노선')) {
            await send(`노선정보: ${stationList}`)
        }else if(eventText.includes('버스') || eventText.includes('출근')){
            await send(`예상 도착 시간`)
        }else{
            await send(`입력 키워드: 노선, 버스 또는 출근`)
        }
    }
})

app.post('/slack/message', async(req, res) => {
    const bodyType = req.body.type
    const eventType = req.body.event.type
    const eventText = req.body.event.text
    const stationList = stations.response.msgBody.busRouteStationList.map(station => {
        return `\n${station.stationSeq}. ${station.stationName}`; 
    })
    if(bodyType === 'event_callback' && eventType === "message") {
        if(eventText === '노선') {
            await send(`Station List: ${stationList}`)
        }else if(eventText === '버스' || eventText === '출근'){
            await send(`예상 도착 시간`)
        }else{
            await send(`입력 키워드: 노선, 버스 또는 출근`)
        }
    }
    res.sendStatus(200)
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`, )
})
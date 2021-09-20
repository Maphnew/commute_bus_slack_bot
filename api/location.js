require('dotenv').config()
const axios = require('axios')
const stations = require('./stations.json')
const PUBLIC_API_SERVICE_KEY = process.env.PUBLIC_API_SERVICE_KEY_DECODE
const API_URL = process.env.API_URL
const convert = require('xml-js');

const location = async() => {
    console.log(API_URL) // http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList
    // console.log(stations.response.msgBody.busRouteStationList[0]) // json file
    await axios.get(API_URL, {
        params: {
            serviceKey: decodeURIComponent(escape(PUBLIC_API_SERVICE_KEY)),
            routeId: 228000179 // 101번 버스
        }
    }).then(response => {
        const data = convert.xml2json(response.data, {compact: true, spaces: 4})
        const busRouteStationList = JSON.parse(data).response.msgBody.busLocationList.stationSeq._text
        console.log(busRouteStationList)
        console.log(stations.response.msgBody.busRouteStationList[busRouteStationList-1]) // json file
    }).catch(error => {
        console.log(error)
    })
}

module.exports = location

require('dotenv').config()
const axios = require('axios')
const stations = require('./stations.json')
const PUBLIC_API_SERVICE_KEY = process.env.PUBLIC_API_SERVICE_KEY_DECODE
const API_URL = process.env.API_URL
const convert = require('xml-js');

const location = async() => {
    // console.log(API_URL) // http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList
    // console.log(stations.response.msgBody.busRouteStationList[0]) // json file
    return axios.get(API_URL, {
        params: {
            serviceKey: decodeURIComponent(escape(PUBLIC_API_SERVICE_KEY)),
            routeId: 228000179 // 101번 버스
        }
    }).then(response => {
        const data = convert.xml2json(response.data, {compact: true, spaces: 4})
        const msg = JSON.parse(data).response
        if(msg.msgHeader.resultCode._text !== "0") {
            console.log(msg)
            return '운행 정보 없음(오리역에 있음)'
        }
        const stationSeq = msg.msgBody.busLocationList.stationSeq._text
        // console.log('stationSeq:', stationSeq)
        const currentLocation = stations.response.msgBody.busRouteStationList[stationSeq-1]
        // console.log('currentLocation:', currentLocation) 
        let result = `${currentLocation.stationSeq}. ${currentLocation.stationName} - ${stationSeq < 60 ? '잠실광역환승센터 방면(출근)' : '오리역 방면(퇴근)'}`
        return result + (stationSeq < 13 ? `주공7단지 까지 ${13 - stationSeq}개 역 남음` : '')
    }).catch(error => {
        console.log('error:', error)
    })
}

module.exports = location

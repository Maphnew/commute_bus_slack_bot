require('dotenv').config()
const axios = require('axios')
const stations = require('./stations.json')
const routeIds = require('./routeid.json')
const PUBLIC_API_SERVICE_KEY = process.env.PUBLIC_API_SERVICE_KEY_DECODE
const convert = require('xml-js');

const location = async() => {
    // console.log(API_URL) // http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList
    // console.log(stations.response.msgBody.busRouteStationList[0]) // json file
    return axios.get('http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList', {
        params: {
            serviceKey: decodeURIComponent(escape(PUBLIC_API_SERVICE_KEY)),
            routeId: routeIds.ROUTE_ID_101
        }
    }).then(response => {
        const data = convert.xml2json(response.data, {compact: true, spaces: 4})
        const msg = JSON.parse(data).response
        console.log(msg)
        if(msg.msgHeader.resultCode._text !== "0") {
            return '운행 정보 없음(오리역에 있음)'
        }
        // msg.msgBody.busLocationList -> Object 이거나 Array 이거나
        if (msg.msgBody.busLocationList.length) {
            return msg.msgBody.busLocationList.map(loc => {
                const stationSeq = loc.stationSeq._text
                const currentLocation = stations.response.msgBody.busRouteStationList[stationSeq-1]
                return `\n${currentLocation.stationSeq}. ${currentLocation.stationName} - ${getDirection(stationSeq)}, ${currentLocation.minLeft ? currentLocation.minLeft + '분 뒤 도착': ''}`
            })
        } else {
            const stationSeq = msg.msgBody.busLocationList.stationSeq._text
            const currentLocation = stations.response.msgBody.busRouteStationList[stationSeq-1]
            return `${currentLocation.stationSeq}. ${currentLocation.stationName} - ${getDirection(stationSeq)}, ${currentLocation.minLeft ? currentLocation.minLeft + '분 뒤 도착': ''}`
        }
        
        
    }).catch(error => {
        console.log('error:', error)
    })
}

const getDirection = (stationSeq) => {
    return stationSeq < 60 ? '잠실광역환승센터 방면(출근)' : '오리역 방면(퇴근)'
}

module.exports = location

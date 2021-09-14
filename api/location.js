require('dotenv').config()
const axios = require('axios')
const stations = require('./stations.json')
const PUBLIC_API_SERVICE_KEY = process.env.PUBLIC_API_SERVICE_KEY
const API_URL = process.env.API_URL

const location = async() => {
    console.log(API_URL)
    console.log(stations.response.msgBody.busRouteStationList[0])
    await axios.get(API_URL, {
        params: {
            serviceKey: decodeURIComponent(escape(PUBLIC_API_SERVICE_KEY)),
            routeId: 228000179
        }
    }).then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
}

module.exports = location

require('dotenv').config()
const axios = require('axios')
const qs = require('qs')

const SLACK_ACCESS_TOKEN = process.env.SLACK_ACCESS_TOKEN

const send = async(message) => {
    await axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
        token: SLACK_ACCESS_TOKEN,
        channel: 'bus',
        text: message
    })).then((res) => {
        console.log(res.data)
    }).catch((error) => {
        console.log(error)
    })
}

module.exports = send



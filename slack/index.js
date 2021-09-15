require('dotenv').config()
const axios = require('axios')
const qs = require('qs')
const botkit = require('botkit')
const Slack = require('slack-node')

const SLACK_ACCESS_TOKEN = process.env.SLACK_ACCESS_TOKEN
const SLACK_SECRET = process.env.SLACK_SECRET

const controller = botkit.slackbot({
    clientSigningSecret: SLACK_SECRET,
	debug: false,
	log: true
});

const botScope = [
	'direct_message',
	'direct_mention',
	'mention'
];

controller.hears(['비품', '비품정리'], botScope, (bot, message) => {
	bot.reply(message, '비품관리 링크주소');
});

controller.spawn({
	token: SLACK_ACCESS_TOKEN
}).startRTM(error => {
    if(error) {
        console.log(error)
    }
});


const send = async(message) => {
    await axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
        token: SLACK_ACCESS_TOKEN,
        channel: 'bus',
        text: message
    }))
}

// const conversation = async() => {
//     await 
// }

module.exports = send



const Slack = require('slack-node')
require('dotenv').config()

const webhookUri = process.env.WEB_HOOK_URI;

const slack = new Slack()
slack.setWebhook(webhookUri)

const send = async(text) => {
    slack.webhook({
        channel: '#bus',
        username: 'webhookbot',
        icon_emoji: ":ghost:",
        text
    }, (error, response) => {
        console.log(error, response)
    })
}

module.exports = send



const Slack = require('slack-node')

const webhookUri = 'https://hooks.slack.com/services/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'

const slack = new Slack()
slack.setWebhook(webhookUri)

const send = async(text) => {
    slack.webhook({
        channel: '#bus',
        username: 'webhookbot',
        // icon_emoji: ":ghost:",
        text
    }, (error, response) => {
        console.log(error, response)
    })
}

module.exports = send



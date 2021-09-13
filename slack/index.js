const Slack = require('slack-node')

const webhookUri = 'https://hooks.slack.com/services/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'

const slack = new Slack()
slack.setWebhook(webhookUri)

slack.webhook({
    channel: '#bus',
    username: 'webhookbot',
    text: 'This is posted to #bus and come from a bot named webhookbot.'
}, (error, response) => {
    console.log(error, response)
})


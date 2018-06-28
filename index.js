var restify = require('restify');
var builder = require('botbuilder');

// setting up restify
var server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log('%s is listening am at %s', server.name, server.url)
});

// Chat connector for communicating with the bot service
var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});
// listen for messages from user
server.post('/api/messages', connector.listen())

// receive message and echo them back
var bot = new builder.UniversalBot(connector, (session) => {
  session.send('you mean %s', session.message.text)
});

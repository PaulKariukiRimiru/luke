var builder = require('botbuilder');
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector, (session) => {
  session.send('you mean %s', session.message.text)
});

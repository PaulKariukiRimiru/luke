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
  session.beginDialog('know_user');
});

bot.dialog('know_user', [
  (session) => {
    builder.Prompts.text(session, 'Hey there stranger whats your name?')
  },
  (session, results) => {
    if (results.response === 'Krants') {
      session.beginDialog('dad_talk');
    } else {
      builder.Prompts.text(session, `nice to meet you ${results.response}, how can i help?`);
    }
  },
  (session, results) => {
    builder.Prompts.text(session, `let me check if i can ${results.response} ill get back at you`)
  }
])

bot.dialog('dad_talk', [
  (session) => {
    builder.Prompts.text(session, 'I hate it when people do this,  whats your real name?');
  },
  (session, results) => {
    if (results.response === 'Krants'){
      builder.Prompts.text(session, 'You know you really have some nerve am just gonna shut this down!!')
    } else {
      session.endDialogWithResult({
        response: result,
      })
    }
  },
  (session, result) => {
    if (result.response === 'ciru') {
      builder.Prompts.text(session, 'Hey dad what you up to?');
    } else {
      session.endDialog(session, 'Bye who ever you are');
    }
  }
])

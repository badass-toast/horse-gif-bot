if (!process.env.SLACK_TOKEN) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./node_modules/botkit/lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
    send_via_rtm:true,
});

var bot = controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM();

controller.hears(['identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {

        bot.reply(message,
            'My name is Horse Gif. I am a bot that sends a horsegif, everytime I see "horse" in a message');

    });

controller.hears(['horse', ' pferd ', ' ross ', ' rössli ', ' cheval ', ' gaul ', ' лошадь '], ['ambient,message_received'], function(bot, message) {
    var request = require("request");
    var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=horse";

    request({ url: url, json: true }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var stringify = JSON.stringify(body);
            var GIF = body.data.image_original_url;
            bot.reply(message, 'Here is your random gif:smile::hrs:: ' +GIF+ '');
        } else {
            bot.reply(message, 'There was a problem with the API. Sorry:cry: no Gif right now');
        }
    });
});

controller.hears([' bojack '], ['ambient,message_received'], function(bot, message) {
    var request = require("request");
    var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=bojack";

    request({ url: url, json: true }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var stringify = JSON.stringify(body);
            var GIF = body.data.image_original_url;
            bot.reply(message, 'Here is your random gif:smile::hrs:: ' +GIF+ '');
        } else {
            bot.reply(message, 'There was a problem with the API. Sorry:cry: no Gif right now');
        }
    });
});

controller.hears([' unicorn ', ' einhorn '], ['ambient,message_received'], function(bot, message) {
    var request = require("request");
    var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=unicorn";

    request({ url: url, json: true }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var stringify = JSON.stringify(body);
            var GIF = body.data.image_original_url;
            bot.reply(message, 'Here is your random gif, FABULOUS edition:smile: ' +GIF+ '');
        } else {
            bot.reply(message, 'There was a problem with the API. Sorry:cry: no Gif right now');
        }
    });
});


var http = require("http");
setInterval(function() {
    http.get("http://horsegifbot.herokuapp.com");
}, 300000); // every 5 minutes (300000)

var express = require('express');
var app = express();

var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'M3wD1dk9HlGZ31r99uK8py0TM',
    consumerSecret: '9nAL1DeI7nBtALK4iB3COACdMvhwMHFQBWXNzqL4TyMJN5la44'
});

var words = require ('./words.json');
var wordsAdjs = Object.keys(words)

var bot = {

	intervalId: null,
	accessToken: "3195001477-eXnqviy4J5vTthK9vaI5aejQsXRjUZtlfwiBp2U",
	accessTokenSecret: "OcHeshCkMofHW0YWydoHoquJod5D9EzB9xtPzccJIA3Fq",

	getRandomSentence: function() {
		var adj = wordsAdjs[parseInt(Math.random()*wordsAdjs.length)];
		return bot.generateSentence(adj);
	},

	generateSentence: function(adj) {	
		var noun = words[adj];
		return "Is our need for " + noun + " " + adj + "?";
	},

	tweet: function() {
		var status = bot.getRandomSentence();
		twitter.statuses("update", {
		        status: status
		    },
		    bot.accessToken,
		    bot.accessTokenSecret,
		    function(error, data, response) {
		        if (error) {
		            // something went wrong 
		        	console.log(error)
		        } else {
		            // data contains the data sent by twitter 
		        	console.log(data)
		        }
		    }
		);
	},

	run: function(delayMin) {
		if (!delayMin) delayMin = 60;
		var delayMillis = delayMin*60*1000  
		bot.intervalId = setInterval(bot.tweet, delayMillis);
	},

	kill: function() {
		clearInterval(bot.intervalId);
	}	

}

app.set('port', (process.env.PORT || 5000));
app.get('/', function(request, response) {
  response.send('Hello World!');
});


bot.run(60)

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

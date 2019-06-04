var authTok = require('./secrets');
var request = require('request');
var fs = require('fs');
var args = process.argv.slice(2);

// console.log(args[0]);
// console.log(args[1]);


function getRepoContributors(repoOwner, repoName, cb) { 
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'node application',
      'Authorization': authTok.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
  	if (!repoName) {
  		console.log("Must enter valid repo name.");
  	} else if (!repoOwner) {
  		console.log("Must enter valid repo owner.");
  	}else{
    cb(err, body);
	}

  });
}

function downloadImageByURL(url, filePath) {
	request.get(url)
		.pipe(fs.createWriteStream(filePath));
}



getRepoContributors(args[0], args[1], function(err, result) {
  var temp = JSON.parse(result);
  temp.forEach(function(element) {
  downloadImageByURL(element.avatar_url, 'avatars/' + element.login + '.jpg');
  });
});





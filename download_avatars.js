var authTok = require('./secrets');
var request = require('request');
var fs = require('fs');


function getRepoContributors(repoOwner, repoName, cb) { 
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'node application',
      'Authorization': authTok.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var temp = JSON.parse(result);
  temp.forEach(function(element) {
  downloadImageByURL(element.avatar_url, 'avatars/' + element.login + '.jpg');
  });
});



function downloadImageByURL(url, filePath) {
	request.get(url)
		.pipe(fs.createWriteStream(filePath));
}




// request.get('https://sytantris.github.io/http-examples/future.jpg')               // Note 1
//        .on('error', function (err) {                                   // Note 2
//          throw err; 
//        })
//        .on('response', function (response) {                           // Note 3
//          console.log('Status Message: ', response.statusMessage);
//          console.log('Response Headers: ', response.headers['content-type']);
//        })
//        .pipe(fs.createWriteStream('./future.jpg'));   



// headers: {
//     'user-agent': 'node application'
// }



// Your next and final step in this exercise should be to change your getRepoContributors
// function to parse the JSON string into an object and pass this object
// (an array of contributor objects) to the cb function.

// You will also need to modify the callback function to iterate over the results
// and (for now) console.log the value for each avatar_url in the collection:




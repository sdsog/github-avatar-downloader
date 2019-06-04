var authTok = require('./secrets');
var request = require('request');


function getRepoContributors(repoOwner, repoName, cb) { // ...

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

//console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var temp = JSON.parse(result);
  //console.log("Result:", temp);
  temp.forEach(function(element){
  	console.log(element.avatar_url);
  });
});


function downloadImageByURL(url, filePath) {
  // ...
}

// headers: {
//     'user-agent': 'node application'
// }

/*

Your next and final step in this exercise should be to change your getRepoContributors
function to parse the JSON string into an object and pass this object
(an array of contributor objects) to the cb function.

You will also need to modify the callback function to iterate over the results
and (for now) console.log the value for each avatar_url in the collection:

*/


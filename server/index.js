const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js');


let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  let username = req.body.username;
  helpers.getReposByUsername(username);
  db.retrieve((data) => {
    let repoData = [];
    for (let i = 0; i < data.length; i++) {
      let userObj = {
        repoID: data[i]._doc.repoID,
        userID: data[i]._doc.userID,
        username: data[i]._doc.username,
        repo_name: data[i]._doc.repo_name,
        url: data[i]._doc.url,
        stars: data[i]._doc.stars
      }
      repoData.push(userObj);
      console.log('USER array IN SERVER:  ', repoData)
    }
    res.send(repoData);
    // console.log('DATA IN SERVER RETRIEVED FROM DB:  ', data[0]._doc);
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});


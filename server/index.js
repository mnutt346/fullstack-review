const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos', (req, res) => {
  let username = req.body.username;
  helpers.getReposByUsername(username)
  setTimeout(() => (db.retrieve((data) => {
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
      // console.log('USER array IN SERVER:  ', repoData)
    }

    res.send(repoData);
  })), 600)

});

app.get('/repos', function (req, res) {
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
      // console.log('USER array IN SERVER GET REQUEST:  ', repoData)
    }
    res.send(repoData);
  });
});


let port = process.env.PORT || 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});


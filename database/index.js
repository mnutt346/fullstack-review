const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoID: {
    type: Number,
    unique: true
  },
  userID: Number,
  username: String,
  repo_name: String,
  url: String,
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {

  for (let i = 0; i < data.length; i++) {
    let repoID = data[i].id;
    let userID = data[i].owner.id;
    let username = data[i].owner.login;
    let repo_name = data[i].name;
    let url = data[i].html_url;
    let stars = data[i].stargazers_count;

    let queryObj = new Repo({
      repoID: repoID,
      userID: userID,
      username: username,
      repo_name: repo_name,
      url: url,
      stars: stars
    })

    Repo.create(queryObj, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log('SUCCESS: INSERTED INTO DB');
    });

  }

}


let retrieve = () => {

}

module.exports.save = save;
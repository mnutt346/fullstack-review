import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Top 25 Repos </h4>
    There are {props.repos.length} repos.
    <ul>
      {props.repos.map(repo => {
        return <li key={repo.repoID}><a href={repo.url}>{repo.repo_name} created by {repo.username}</a></li>
      })}
    </ul>

  </div>
)

export default RepoList;
import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Top 25 Repos </h4>
    There are {props.repos.length} repos.
    <ol>
      {props.repos.map(repo => {
        return <li key={repo.repoID}><a href={repo.url}>{repo.repo_name}</a><span> created by {repo.username}</span></li>
      })}
    </ol>

  </div>
)

export default RepoList;
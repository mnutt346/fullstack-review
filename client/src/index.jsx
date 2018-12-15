import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Users from './components/Users.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      users: []
    }

  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/repos',
      contentType: 'application/json'
    })
      .done((data) => {
        // console.log('DATA SENT TO CLIENT FROM GET:  ', data);
        this.setState({ repos: data }
          // console.log('repos in App state on load of homepage: ', this.state.respos)
        )

      })

    $.ajax({
      method: 'GET',
      url: '/users',
      contentType: 'application/json'
    }).done((users) => {
      this.setState({ users: users })
      console.log('USERS in App state: ', users)

    })
  }

  search(term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      url: '/repos',
      contentType: 'application/json',
      data: JSON.stringify({ username: term })
    })
      .done((data) => {
        // console.log("SUCCESS -- AJAX POST: ", data)
        this.setState({ repos: data })
        console.log('repos in App state after search:  ', this.state.repos)
      });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)} />
      <RepoList repos={this.state.repos} />
      <Users users={this.state.users} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
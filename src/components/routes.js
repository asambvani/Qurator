import React from 'react'
import { Route } from 'react-router'
import App from './App'
// import CounterPage from './CounterPage'
import Notfound from './Notfound'

export default (
  <Route path="/" component={App}>
    <Route path="*" component={Notfound} />
  </Route>
)

// <Route path="/counter" component={CounterPage} />
// <Route path="/github" component={GithubPage} />
//   <Route path="/github/:username" component={GitUserPage} />
//   <Route path="/github/:username/:reponame" component={RepoPage} />


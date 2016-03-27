import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Picker from './Picker'
import Contacts from './Contacts'
import Notfound from './Notfound'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Picker} />
    <Route path="/contacts" component={Contacts} />
    <Route path="*" component={Notfound} />
  </Route>
)

// <Route path="/counter" component={CounterPage} />
// <Route path="/github" component={GithubPage} />
//   <Route path="/github/:username" component={GitUserPage} />
//   <Route path="/github/:username/:reponame" component={RepoPage} />

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Picker from './Picker'
import Contacts from './Contacts'
import About from './Contacts'
import Notfound from './Notfound'

export default (
  <Route path="app" component={App}>
    <IndexRoute component={Picker} />
    <Route path="contacts" component={Contacts} />
    <Route path="about" component={About} />
    <Route path="*" component={Notfound} />
  </Route>
)
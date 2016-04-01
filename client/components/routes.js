import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Qurate from './Qurate'
import Cart from './Cart'
import Contacts from './Contacts'
import About from './About'
import Notfound from './Notfound'

export default (
  <Route path="app" component={App}>
    <IndexRoute component={Qurate} />
    <Route path="cart" component={Cart} />
    <Route path="contacts" component={Contacts} />
    <Route path="about" component={About} />
    <Route path="*" component={Notfound} />
  </Route>
)

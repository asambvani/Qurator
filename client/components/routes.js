import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Qurate from './Qurate'
import Cart from './Cart'
import Shop from './Shop'
import Contacts from './Contacts'
import About from './About'
import Notfound from './Notfound'

export default (
  <Route path="app" component={App}>
    <IndexRoute component={Qurate} />
    <Route name="#qurator_shop" path="shop" component={Shop} />
    <Route name="cart" path="cart" component={Cart} />
    <Route name="get intouch !" path="contacts" component={Contacts} />
    <Route name="the qurators" path="about" component={About} />
    <Route name="this page doesn't exist" path="*" component={Notfound} />
  </Route>
)

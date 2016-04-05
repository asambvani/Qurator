import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import store from './store'
import { fetchImages } from './actions/images'
import 'styles/font-awesome'
import 'styles/bootstrap-social'
import 'styles/bootstrap.min'
import 'styles/main'

store.dispatch(fetchImages())

render(
  <Root store={store} />,
  document.getElementById('root')
)

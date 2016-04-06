import React from 'react'
import { render } from 'react-dom'
import 'styles'
import Root from './components/Root'
import store from './store'

render(
  <Root store={store} />,
  document.getElementById('root')
)

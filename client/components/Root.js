import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory, Redirect } from 'react-router'
import DevTools from './DevTools'
import routes from './routes'
import 'styles/bootstrap.min'
import 'styles/main'

class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  render() {
    if (module.hot) {
      module.hot.decline('./routes.js')
    }

    return (
      <Provider store={this.props.store}>
        <div>
          <Router history={browserHistory} >
            <Redirect from="/" to="/app" />
            {routes}
          </Router>
          <DevTools />
        </div>
      </Provider>
    )
  }
}

export default Root

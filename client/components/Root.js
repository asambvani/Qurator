import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory, Redirect } from 'react-router'
import DevTools from './DevTools'
import 'styles/bootstrap.min'
import 'styles/main'
import routes from './routes'

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
          {!window.devToolsExtension ? <DevTools /> : null}
        </div>
      </Provider>
    )
  }
}

export default Root

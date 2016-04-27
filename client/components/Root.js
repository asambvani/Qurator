import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, useRouterHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import useScroll from 'scroll-behavior/lib/useStandardScroll'
import DevTools from './DevTools'
import routes from './routes'

const appHistory = useScroll(useRouterHistory(createBrowserHistory))()

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
          <Router history={appHistory} >
            {routes}
          </Router>
          {!window.devToolsExtension ? <DevTools /> : null}
        </div>
      </Provider>
    )
  }
}

export default Root

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../components/DevTools'
import updateFilter from '../middleware/updateFilter'
import initialState from '../services/initialState'


const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(updateFilter, thunk, api),
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
  )
)

if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers').default
    store.replaceReducer(nextRootReducer)
  })
}


export default store

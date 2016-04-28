import { createReducer } from 'redux-act'
import { stepForward, restartQuiz, resetQurate } from 'actions/qurate'
import initialState from 'services/initialState'

const init = initialState.qurator.step

export default createReducer({
  [stepForward]: (state) => (state % 4) + 1,
  [restartQuiz]: () => 1,
  [resetQurate]: () => init,
}, init)

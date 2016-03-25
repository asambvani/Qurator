import { createSelector } from 'reselect'

export const counterSumSelector = createSelector(
  (state) => state.counterList,
  (counters) => (
    counters.reduce((sum, counter) => sum + counter.value, 0)
  )
)

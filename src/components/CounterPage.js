import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { counterSumSelector } from 'selectors'
import List from 'components/List'
import Counter from 'components/Counter'

const CounterPage = ({ items, sum }) => (
  <div>
    <h4>Counters:</h4>
    <p>Sum: {sum}</p>
    <List
      ItemComponent={Counter}
      items={items}
    />
  </div>
)

CounterPage.propTypes = {
  items: PropTypes.array.isRequired,
  sum: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  items: state.counterList,
  sum: counterSumSelector(state),
})

export default connect(mapStateToProps)(CounterPage)

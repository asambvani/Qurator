import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import Navbar from 'components/Navbar'

const handleHomeClick = () => {
  browserHistory.push('/')
}

const App = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
)

App.propTypes = {
  children: PropTypes.node,
}

export default App

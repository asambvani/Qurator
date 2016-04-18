import React, { PropTypes } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const App = ({ routes, children }) => (
  <div>
    <Navbar routes={routes} />
    {children}
    <Footer />
  </div>
)

App.propTypes = {
  children: PropTypes.node,
  routes: PropTypes.array,
}

export default App

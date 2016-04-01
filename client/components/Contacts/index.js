import React, { Component } from 'react'

class Contacts extends Component {
  render() {
    return (
      <div className="container" >
        <p>We’d love to hear from you!</p>
        <p>
          Feel free to contact us at <a href="mailto:info@qurator-art.com">
          info@qurator-art.com
        </a>
        </p>
        <p>
          If you are an artist interested in joining our platform, please send us your Instagram
      handle and / or a link to your portfolio.
        </p>
        <p>
          Love,<br />
          The Qurator Team
        </p>
      </div>
    )
  }
}

export default Contacts

import React, { Component } from 'react'

class Contacts extends Component {
  render() {
    return (
      <div className="container" >
        <br />
        <p>We’d love to hear from you!</p>
        <p>
          Feel free to contact us at <a href="mailto:info@qurator-art.com">
          info@qurator-art.com
        </a>
        </p>
        <p>
          If you are an artist interested in joining our platform,
          please send an email with your Instagram handle and / or
          a link to your portfolio to artists@qurator-art.com.
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

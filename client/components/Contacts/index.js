import React, { Component } from 'react'
import styles from './styles'

class Contacts extends Component {
  render() {
    return (
      <div className="container">
        <div className={styles.contactBox}>
        <i className="icon icon_mail_alt"></i>
        <p className={styles.email}>EMAIL</p>
        <a href="mailto:info@qurator-art.com">
          info@qurator-art.com
        </a>
        <p>We’d love to hear from you!</p>
        <p>
          Feel free to contact us
        </p>
        </div>
        <p className={styles.contactText}>
          If you are an artist interested in joining our platform,<br />
          please send an email with your Instagram handle and / or
          a link <br /> to your portfolio to artists@qurator-art.com.
        </p>
        <p className={styles.contactSign}>
          Love,<br />
          The Qurator Team
        </p>
      </div>
    )
  }
}

export default Contacts

import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './styles'
import { Button } from 'react-bootstrap'

export default class ButtonsGroup extends Component {
  render() {
    return (
      <div className={styles.buttonsGroup} >
        <div>
          <p>Click here to use our <br />algorithm and find <br />the perfect art for you!</p>
          <Link to="/qurate" >
            <Button bsStyle="primary" className={styles.btnYellow} >
              <span className={styles.arrowBtn} ></span>Qurate</Button>
          </Link>
        </div>
        <div>
          <Link to="/shop" >
            <Button bsStyle="primary" className={styles.btnBlack} >Shop Now</Button>
          </Link>
        </div>
      </div>
    )
  }
}

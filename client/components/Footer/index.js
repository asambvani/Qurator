import React from 'react'
import { Col, Grid, Row } from 'react-bootstrap'
import { Link } from 'react-router'
import styles from './styles'

const Footer = () => (
  <footer className="footer">

   <Grid>
     <Row className={styles.footerRow}>
      <Col md={3} sm={3} xs={6}>
        <Link to="/" className={styles.logo}>
           <img src="/img/logo.jpg" />
        </Link>
      </Col>
      <Col md={3} sm={3} xs={6}>
        <h4>shop</h4>
        <ul className={styles.footerMenu}>
        <li className={styles.linkQurate}><Link to="/qurate">Qurator</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        </ul>
      </Col>
      <Col md={3} sm={3} xs={6}>
        <h4>More information</h4>
        <ul className={styles.footerMenu}>
        <li><Link to="/contacts">Contact</Link></li>
        <li><Link to="/about">About</Link></li>
        </ul>
      </Col>
      <Col md={3} className="text-center" sm={3} xs={6}>
        <h4 className={styles.followUs}>Follow us on</h4>
        <div className={styles.socialBar} >
          <a
            className="btn btn-social-icon btn-lg btn-facebook btnn"
            href="https://www.facebook.com/quratorart/"
          >
            <i className="fa fa-facebook" />
          </a>
          <a
            className="btn btn-social-icon btn-lg btn-instagram"
            href="https://www.instagram.com/qurator_art/"
          >
            <i className="fa fa-instagram" />
          </a>
        </div>
      </Col>
    </Row>
      <Col md={12}>
       <hr />
        <p className={styles.copyRight}> &copy; 2016 <a>QURATOR</a> All Rights Reserved</p>
      </Col>
    </Grid>
  </footer>
)

export default Footer

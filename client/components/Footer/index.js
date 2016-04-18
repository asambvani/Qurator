import React from 'react'
import { Col, Grid, Row } from 'react-bootstrap'
import { Link } from 'react-router'

import styles from './styles'

const Footer = () => (
  <footer className="footer">
          <hr />
   <Grid>
   <Row className={styles.footerRow}>
    <Col md={3}>
    	<Link to="/app" className={styles.logo}>
           <img src="/img/logo.jpg" />
        </Link>
        <p className="text-center">Awesome art by a community of
uprising instagramers</p>
    </Col>
    <Col md={3}>
    	<h4>shop</h4>
    	<ul className={styles.footerMenu}>
    	<li className={styles.linkQurate}><a>Qurate</a></li>
    	<li><a>Shop entire store</a></li>
    	</ul>
    </Col>
    <Col md={3}>
    	<h4>More information</h4>
    	<ul className={styles.footerMenu}>
    	<li><a>Contact</a></li>
    	<li><a>About</a></li>
    	</ul>
    </Col>
    <Col md={3} className="text-center">
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

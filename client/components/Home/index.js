import React, { Component } from 'react'
import { Grid, Row, Col, Carousel, CarouselItem, Button } from 'react-bootstrap'
import styles from './styles'

class Home extends Component {
  render() {
    return (
      <Grid fluid >
        <Carousel className={styles.carousel}>
          <CarouselItem className={styles.carouselItem}>
            <img width="100%" height="500px"  alt="900x500" src="/img/large/01.jpg" />
            <div className="carousel-caption">
              <h3>Qurator</h3>
              <p>For when you want art, <br />but dont know where to start.</p>
              <div className={styles.buttonsGroup}>
                <div >
                <p>Click here to use our <br />algorithm and find <br />the perfect art for you!</p>
                <Button bsStyle="primary" className={styles.btnYellow}><span className={styles.arrowBtn}></span>Qurate</Button>
                </div>
                <div>
                <Button bsStyle="primary" className={styles.btnBlack}>Show Now</Button>
              </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className={styles.carouselItem}>
            <img width="100%" height="500px" alt="900x500" src="/img/large/02.jpg" />
            <div className="carousel-caption">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </CarouselItem>
          <CarouselItem className={styles.carouselItem}>
            <img width="100%" height="500px" alt="900x500" src="/img/large/03.jpg" />
            <div className="carousel-caption">
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </div>
          </CarouselItem>
        </Carousel>
        <Row>
          Our products
        </Row>
        <Row>
          Images
        </Row>
      </Grid>
    )
  }
}

export default Home

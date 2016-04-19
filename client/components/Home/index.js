import React, { Component } from 'react'
import { Grid, Row, Col, Carousel, CarouselItem } from 'react-bootstrap'
import styles from './styles'

class Home extends Component {
  render() {
    return (
      <Grid>
        <Carousel>
          <CarouselItem>
            <img width={900} height={500} alt="900x500" src="/img/large/01.jpg" />
            <div className="carousel-caption">
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <img width={900} height={500} alt="900x500" src="/img/large/02.jpg" />
            <div className="carousel-caption">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <img width={900} height={500} alt="900x500" src="/img/large/03.jpg" />
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

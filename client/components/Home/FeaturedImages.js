import React, { PropTypes } from 'react'
import { Carousel, CarouselItem, ButtonGroup, Button } from 'react-bootstrap'
import { chunk } from 'lodash'
import ImageModalHandler from 'components/ImageModalHandler'
import ImageTumbnailShowsModalOnClick from '../Showcase/ImageTumbnailShowsModalOnClick'
import styles from './styles'

const FeaturedImages = ({ images, showModal, addToCart }) => (
  <div className={styles.featureSection}>
    <h3 className={styles.featureTitle}>Featured images</h3>
    <Carousel className={styles.carouselFeature} indicators={false}>
      {chunk(images, 3).map((chunkedImages, slideNumber) => (
        <CarouselItem className={styles.carouselFeatureItem} key={slideNumber}>
          {chunkedImages.map((img, i) => (
            <div key={img.id}>
              <ImageTumbnailShowsModalOnClick
                index={slideNumber * 3 + i}
                image={img}
                showModal={showModal}
                imgClass={styles.preview}
              />
              <div
                className={styles.addToCart}
                onClick={() => addToCart({ id: img.id })}
              > <ButtonGroup justified className={styles.btnGroup}>
                <Button className={styles.addToCartButton}>Add to cart</Button>
                <Button><i className="fa fa-heart-o" aria-hidden="true"></i></Button>
                </ButtonGroup>
              </div>
            </div>
          ))}
        </CarouselItem>
      ))}
    </Carousel>
  </div>
)

FeaturedImages.propTypes = {
  images: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
}

export default ImageModalHandler(FeaturedImages)

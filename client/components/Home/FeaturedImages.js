import React, { PropTypes } from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap'
import { chunk } from 'lodash'
import ImageModalHandler from 'components/ImageModalHandler'
import ImageTumbnailShowsModalOnClick from '../Showcase/ImageTumbnailShowsModalOnClick'
import styles from './styles'

const FeaturedImages = ({ images, showModal, addToCart }) => (
  <div>
    <h3>Featured images</h3>
    <Carousel className={styles.carouselFeature}>
      {chunk(images, 3).map((chunkedImages, slideNumber) => (
        <CarouselItem className={styles.carouselFeatureItem} key={slideNumber}>
          {chunkedImages.map((img, i) => (
            <div key={img.id}>
              <ImageTumbnailShowsModalOnClick
                key={img.id}
                index={slideNumber * 3 + i}
                image={img}
                showModal={showModal}
              />
              <div
                className={styles.addToCart}
                onClick={() => addToCart({ id: img.id })}
              >
                Add to cart
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

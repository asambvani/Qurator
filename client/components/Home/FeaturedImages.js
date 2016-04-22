import React, { PropTypes } from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap'
import { chunk } from 'lodash'
import ImageModalHandler from 'components/ImageModalHandler'
import ImageTumbnailShowsModalOnClick from '../Showcase/ImageTumbnailShowsModalOnClick'
import styles from './styles'

const arrowRight = <i className="arrow_carrot-right featureIcon" aria-hidden="true"></i>
const arrowLeft = <i className="arrow_carrot-left featureIcon" aria-hidden="true"></i>

const FeaturedImages = ({ images, showModal, addToCart }) => (
  <div className={styles.featureSection}>
  <div className="text-center">
    <h3 className={styles.featureTitle}><span>F</span>Featured images</h3>
  </div>
    <Carousel
      className={styles.carouselFeature}
      indicators={false}
      nextIcon={arrowRight}
      prevIcon={arrowLeft}
    >
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

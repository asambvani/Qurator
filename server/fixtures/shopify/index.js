import fs from 'fs'
import path from 'path'
import configShared from '../../../shared/config'
import db from '../../db'
import Image from '../../models/image'
import Artist from '../../models/artist'
import Product from './product'
import d3 from 'd3'
import log from '../../log'
import config from 'config'

const readFixtures = (fileName) => (
  fs.readFileSync(path.resolve(`./server/fixtures/${fileName}`), 'utf-8')
)

db(config.get('db'), log).then(() => {
  const error = console.error.bind(console)
  const { options } = configShared

  const variants = options.variants.map(variant => ({
    ...variant,
    option1: variant.size,
    option2: variant.finish,
  }))

  const updateShopifyProductsAndMongoDB = async() => {
    try {
      // log('Removing images from DB')
      // await Image.remove({})
      // log('Removed images from DB')

      log('Loading images from file')
      const images = d3.csv.parse(readFixtures('images.csv'), image => {
        if (!image.featured) { delete image.featured }
        return {
          ...image,
          _id: +image._id,
          artist_id: +image.artist_id,
          tags: image.tags.split(', '),
        }
      })

      const artists = d3.csv.parse(readFixtures('artists.csv'), artist => ({
        ...artist,
        _id: +artist._id,
      }))

      log(`Loaded ${images.length} images from file`)
      log(`Loaded ${artists.length} artists from file`)

      log('Loading products from shopify')
      const products = await Product.list()
      log(`Found ${products.length} products`)

      if (products.length) {
        log('Deleting products from shopify')

        for (let i = 0; i < products.length; i++) {
          const product = products[i]
          await Product.delete(product.id)
          log(`Deleted #${i} id ${product.id}`)
        }
      }

      log('Adding products to shopify')

      const createdProducts = await images.reduce(
        (acc, image, index) => acc
          .then(res => {
            const { title, description, artist, artistBio, url } = image
            return Product.create(
              {
                product: {
                  title,
                  published_scope: 'global',
                  published: true,
                  variants,
                  options: [
                    { name: 'Size' },
                    { name: 'Finish' },
                  ],
                  body_html: `<strong>Description:</strong> ${description}<br /> ` +
                  `<strong>Artist:</strong> ${artist}<br /> ` +
                  `<strong>Artist BIO:</strong> ${artistBio}`,
                  product_type: 'Image on canvas',
                  images: [
                    {
                      attachment: fs.readFileSync(path.resolve(`./img/thumb/${url}`), 'base64'),
                    },
                  ],
                },
              })
              .then(
                ({ product }) => {
                  log(`Added #${index} productId ${product.id}`)
                  log(`Saving #${index} image to Mongo...`)
                  res.push(product)
                  return Image
                    .create({ ...image, productId: product.id })
                    .then(() => {
                      log('...saved')
                      return res
                    })
                })
          }),
        Promise.resolve([])
      )

      log(`Added ${createdProducts.length} products`)
      return createdProducts
    } catch (err) {
      error(err)
      return err
    }
  }

  updateShopifyProductsAndMongoDB().then(() => {
    log('Go to shopify and publish all products for Button#6')
    process.exit()
  })
})

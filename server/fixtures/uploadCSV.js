import fs from 'fs'
import d3 from 'd3'
import path from 'path'
import Image from '../models/image'
import '../db'

const images = d3.csv
  .parse(fs.readFileSync(path.resolve('./server/fixtures/tags.csv'), 'utf-8'))
  .map(image => ({
    ...image,
    tags: image.tags.split(', '),
  }))

const insertImages = async(data) => {
  try {
    await Image.remove({})
    const imagesCount = await Image.count({})

    if (!imagesCount) {
      await Image.insertMany(data)
    }

    if (!imagesCount) {
      console.log('Inserted successfully')
    }
  } catch (err) {
    console.error(err)
  }
  process.exit()
}

insertImages(images)

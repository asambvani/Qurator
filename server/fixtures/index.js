import Image from '../models/image'
import { shuffle } from 'lodash'
import '../db'

const generateImages = (n) => {
  const tags = [
    'react', 'node', 'kitten', 'basketball', 'traveling',
    'nature', 'sea', 'summer', 'snowboarding', 'tv', 'wow',
  ]
  const pickTag = (data) => data[Math.floor(Math.random() * (data.length))]
  return [...Array(n)].map((image, i) => ({
    url: `/img/thumb/${i < 9 ? '0' : ''}${i + 1}.jpg`,
    tags: [pickTag(tags), pickTag(tags)],
    order: i + 1,
  }))
}

const insertImages = async (data) => {
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

let images = []
for (let i = 0; i < 10; i++) {
  images = images.concat(shuffle(generateImages(38)))
}
// console.log(images)
insertImages(images)

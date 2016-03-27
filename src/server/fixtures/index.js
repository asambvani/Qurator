import Image from '../models/image'
import '../db'

const generateImages = () => {
  const tags = ['react', 'node', 'kitten', 'basketball']
  return [...Array(38)].map((image, i) => ({
    url: `img/thumb/0${i + 1}.jpg`,
    tags: [tags[Math.floor(Math.random() * (tags.length))]],
    order: i + 1,
  }))
}

const initDummyData = async (data) => {
  try {
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

const images = generateImages()
// console.log(images)
initDummyData(images)

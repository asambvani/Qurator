import express from 'express'
import mongoose from 'mongoose'

const Image = mongoose.model('Image')
const router = express.Router()

// router.get('/cart', () => {
//   res.json([
//     {
//       size,
//       id,
//       count
//     }
//   ])
// })
//
// router.post('/cart', () => {
//   res.json([
//     {
//       size,
//       id,
//       count
//     }
//   ])
// })

router.post('/images', async (req, res) => {
  try {
    const images = await Image.list(req.body)
    res.json(images)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.post('/images/filter', async (req, res) => {
  try {
    const images = await Image.filter(req.body)
    res.json(images)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// router.post('/shopify', () => {
//   //reset cart if shopiufy ok
//   //else keep cart
//   {
//     sessionId,
//     result
//   }
// })

export default router

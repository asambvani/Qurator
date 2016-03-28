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

// tags or filter {resolution, tag, name}
router.post('/images', async (req, res) => {
  try {
    const images = await Image.list(req.body)
    res.json(images)
  } catch (err) {
    console.error(err)
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

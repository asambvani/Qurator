import express from 'express'
import mongoose from 'mongoose'
import includes from 'lodash/includes'
import shuffle from 'lodash/shuffle'

const Image = mongoose.model('Image')
const router = express.Router()

router.post('/images/tags', async (req, res) => {
  try {
    const images = await Image.list(req.body)
    res.json(images)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.post('/images/filter', async (req, res) => {
  console.log('filter req, session.cart: ', req.session.cart)
  try {
    const images = await Image.filter(req.body)
    res.json(images)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.post('/images/picker', async (req, res) => {
  try {
    const blackListedIds = req.body
    const images = await Image.find()
    console.log(images, images[0].id)
    res.json(shuffle(images.filter(image => !includes(blackListedIds, image.id))).slice(0, 4))
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.post('/cart', async (req, res) => {
  console.log('cart post: ', req.body)
  req.session.cart = req.body
  console.log('cart set: ', req.session.cart)
  res.sendStatus(200)
})

export default router

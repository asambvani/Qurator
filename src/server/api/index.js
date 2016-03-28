import express from 'express'

const router = express.router()



router.get('/cart', () => {
  res.json([
    {
      size,
      id,
      count
    }
  ])
})

router.post('/cart', () => {
  res.json([
    {
      size,
      id,
      count
    }
  ])
})


//tags or filter {resolution, tag, name}
router.post('/images', () => {
  
  Images.find({})
  res.json([
    //images
  ])
})


router.post('/shopify', () => {
  //reset cart if shopiufy ok 
  //else keep cart
  {
    sessionId,
    result
  }
});


export router
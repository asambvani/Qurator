import shopifyAPI from 'shopify-node-api'
import config from 'config'
const Shopify = new shopifyAPI({
  verbose: false,
  shop: config.get('shopify.login'),
  shopify_api_key: config.get('shopify.apiKey'),
  access_token: config.get('shopify.token'),
})

export default {
  create: product => new Promise((resolve, reject) => {
    Shopify.post(
      '/admin/products.json',
      product,
      (err, result) => (err ? reject(err) : resolve(result))
    )
  }),
  list: () => new Promise((resolve, reject) => {
    Shopify.get(
      '/admin/products.json',
      (err, result) => (err ? reject(err) : resolve(result.products))
    )
  }),
  delete: id => new Promise((resolve, reject) => {
    Shopify.delete(
      `/admin/products/${id}.json`,
      (err, result) => (err ? reject(err) : resolve(result))
    )
  }),
}

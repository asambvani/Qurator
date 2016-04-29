export default {
  options: {
    finishes: ['glossy', 'matte'],
    sizes: ['16x20 inch', '24x30 inch'],
    variants: [
      {
        size: '16x20 inch',
        finish: 'glossy',
        price: 80,
        sku: 1,
      },
      {
        size: '24x30 inch',
        finish: 'glossy',
        price: 135,
        sku: 2,
      },
      {
        size: '16x20 inch',
        finish: 'matte',
        price: 80,
        sku: 3,
      },
      {
        size: '24x30 inch',
        finish: 'matte',
        price: 135,
        sku: 4,
      },
    ],
    qty: 10,
  },
}

import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import configureStore from './store/configureStore'

const generateImages = (n) => {
  const tags = ['react', 'node', 'kitten', 'basketball']
  return [...Array(n)].map((image, i) => ({
    url: `img/thumb/${i < 9 ? '0' : ''}${i + 1}.jpg`,
    tags: [tags[Math.floor(Math.random() * (tags.length))]],
    order: i + 1,
  }))
}

const store = configureStore({ images: generateImages(38) })

render(
  <Root store={store} />,
  document.getElementById('root')
)

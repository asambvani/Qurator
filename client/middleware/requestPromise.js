import superagent from 'superagent'

export default function ({ endpoint, method, data }) {
  const url = `/api/${endpoint}`
  const request = superagent(method || 'GET', url).type('json')
  request.send(data || {})

  return new Promise((resolve, reject) => {
    request.end((err, res) => {
      if (err || !res.ok) {
        const e = new Error(err.message)
        e.data = { endpoint, data }
        reject(e)
      }

      resolve(res.body)
    })
  })
}


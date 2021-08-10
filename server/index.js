const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()

require('dotenv').config()
const { auth } = require('./api')

const config = require('../nuxt.config.js')

app.use('/api/*',function (req, res, next) {
  console.log('Time:', Date.now())
  console.log(process.env.APP_SERVER)
  next()
})

app.use('/api/stations', [auth])




config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  let server = false
  const args = process.argv
  if (
    args.find((x) => x.includes('server=')) &&
    args.find((x) => x.includes('server=')).length > 0
  ) {
    server = args.find((x) => x.includes('server=')).split('=')[1] === 'true'
  }

  let { host, port } = { host: 'localhost', port: '3001' }

  if (!server) {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    host = nuxt.options.server.host
    port = nuxt.options.server.port

    await nuxt.ready()
    // Build only in dev mode
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    app.use(nuxt.render)
  }

  // Listen the server
  app.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
}
start()
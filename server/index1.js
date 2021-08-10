const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const helmet = require('helmet')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const responseTime = require('response-time')

const config = require('../nuxt.config.js')

const api = require('./api')
const { winstonMiddleware } = require('./utils/logger')
const logger = require('./utils/logger')

app.use(helmet())
app.use(cookieParser())
app.use(compression())
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json({ limit: '10mb' }))

app.use(responseTime())

app.get('/logout', (req, res) => {
  logger.info({
    userId: req.userId,
    action: 'logOut',
    status: 'success'
  })

  res.redirect('/api/auth/logout')
})

app.use('/api/*', winstonMiddleware)
app.use('/api', api)
app.use('/test', (req, res) => {
  res.json({ test: true })
})

process.on('uncaughtException', (err) => {
  logger.error({
    action: 'uncaughtException',
    message: `Caught exception: ${err}`
  })
})

process.on('unhandledRejection', (reason, p) => {
  logger.error({
    action: 'unhandledRejection',
    message: `Unhandled Rejection at: Promise ${p}, reason: ${reason}`
  })
})

// Import and Set Nuxt.js options
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
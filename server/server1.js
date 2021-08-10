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

function start() {
  // Init Nuxt.js
  // const nuxt = new Nuxt(config)

  // const { host, port } = nuxt.options.server
  // await nuxt.ready()
  // // Build only in dev mode
  // if (config.dev) {
  //   const builder = new Builder(nuxt)
  //   await builder.build()
  // } else {
  // }

  // app.use(nuxt.render)

  // Listen the server
  app.listen(3001, () => {
    consola.ready({
      message: `Server listening on http://localhost:3000`,
      badge: true
    })
  })
}
start()

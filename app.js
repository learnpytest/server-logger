// app.js
const express = require('express')
const app = express()
const port = 3000

const onFinished = require('on-finished')

app.set('trust proxy', true)

const logger = (req, res, next) => {
  const time = new Date()
  const timeStampForRequest = time.getTime()
  const localTimeForRequest = time.toLocaleString()
  next()

  onFinished(res, function (err, res) {
    if (err) return console.log(err)
    const timeStampForResponse = new Date().getTime()
    const responseTimeGap = timeStampForResponse - timeStampForRequest
    console.log(`Use onFinished npm too: ${localTimeForRequest} | ${req.method} from ${req.path} | total time: ${responseTimeGap}ms`)
  })
  res.on('finish', () => {
    const timeStampForResponse = new Date().getTime()
    const responseTimeGap = timeStampForResponse - timeStampForRequest
    console.log(`Use res.on finish: ${localTimeForRequest} | ${req.method} from ${req.path} | total time: ${responseTimeGap}ms`)
  })
  res.on('close', () => {
    const timeStampForResponse = new Date().getTime()
    const responseTimeGap = timeStampForResponse - timeStampForRequest
    console.log(`Use res.on close: ${localTimeForRequest} | ${req.method} from ${req.path} | total time: ${responseTimeGap}ms`)
  })
  const timeStampForResponse = new Date().getTime()
  const responseTimeGap = timeStampForResponse - timeStampForRequest
  console.log(`Console log directly: ${localTimeForRequest} | ${req.method} from ${req.path} | total time: ${responseTimeGap}ms`)
}

app.use(logger)

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})
//
app.use((req, res) => {
  res.end()
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
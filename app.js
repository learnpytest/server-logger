// app.js
const express = require('express')
const app = express()
const port = 3000

app.set('trust proxy', true)

const logger = (req, res, next) => {
  const timeForRequest = new Date().toLocaleString()
  console.log(`${timeForRequest} network info HTTP | ${req.method} from ${req.path} | IP is ${req.ip} on ${req.get('host')}`)
  next()
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

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
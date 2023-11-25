const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/landing', (req, res) => {
  res.send('Landing Page')
})

app.get('/tournamnet', (req, res) => {
  res.send('Landing Page')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const app = express()
const port = 3000
const clientDir = __dirname + '\\client\\'

app.use(express.json())
app.use(express.urlencoded())

const users = []

app.get('/', (req, res) => res.sendFile(clientDir + 'index.html'))
app.get('/style', (req, res) => {
  res.sendFile(clientDir + 'style.css')
})

app.get('/cheesus', (req, res) => {
  res.sendFile(clientDir + 'facepalmJesus.jpg')
})

app.post('/register', function (req, res) {
  const user = {name: req.body.apa, password: req.body.password }
  users.push(user)
  res.send(users)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
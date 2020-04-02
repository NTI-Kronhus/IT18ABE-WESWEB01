const bcrypt = require('bcryptjs')
const express = require('express')
const UserModel = require('./UserModel')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => res.sendFile(__dirname + '\\start.html'))

app.get('/a', (req, res) => {
  res.sendFile(__dirname + '\\style.css')
})

app.get('/b', (req, res) => {
  res.sendFile(__dirname + '\\facepalmjesus.jpg')
})

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    UserModel.registerUser(req.body.name, hashedPassword)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/login', async (req, res) => {
  try {
    const user = await UserModel.findUser(req.body.name)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success!')
    }
    else {
      res.send("FAILED!!!")
    }
  } catch {
    res.status(500).send()
  }
})

app.get('/users', async (req, res) => {
  try {
    let users = await UserModel.getUsersList()
    console.log(users)
    res.status(201).send(users)
  } catch {
    console.log("START MONGODB")
    res.status(500).send()
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
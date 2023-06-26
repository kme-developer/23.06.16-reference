// app.js

const express = require('express')

const connect = require('./schemas')
const routes = require('./routes')

const app = express()
const port = 3000

connect()

// Express.js에서 제공하는 JSON Middleware로서, body로 전달된 자료를 사용할 수 있도록 해줍니다.
// 반드시 'app.use("/api", routes)'보다 위에 작성해야 합니다.
app.use(express.json())

// localhost:3000/api/ => postsRouter, commentsRouter
app.use('/api', routes)

app.listen(port, () => {
  console.log(port, '=> server open!');
});

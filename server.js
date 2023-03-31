const express = require('express')
const { router } = require('./Routes/index')
const app = express()
const PORT = process.env.PORT || 3001

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});

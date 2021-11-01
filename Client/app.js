const path = require('path')
const express = require('express')
const app = express()
const port = 8080

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

app.listen(port, () => console.info(`Hosteando na porta ${port}`))
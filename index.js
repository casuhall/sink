const express = require('express')
const bodyParser = require('body-parser')

const sinkServer = express()
const historyServer = express()

const history = new Array();

sinkServer.use(bodyParser.json()) // for parsing application/json
sinkServer.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
sinkServer.use(bodyParser.text({ type: "*/*" }))

sinkServer.all('/*', (req, res) => {
    var item = (({ ip, path, method, query, body, headers }) => ({ ip, path, method, query, body, headers }))(req)
    history.push(item)
    res.send(item)
})
sinkServer.listen(8080, () => {
    console.log("Serveur sink à l'écoute sur port 8080")
})


historyServer.get('/', (req, res) => res.send(history))
historyServer.listen(8081, () => {
    console.log("Serveur history à l'écoute sur port 8081")
})

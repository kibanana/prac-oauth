const { connect } = require('mongoose')

const url = 'mongodb://localhost:27017'
const dbName = 'test'

connect(url, { useNewUrlParser: true, autoReconnect: true, reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000, dbName })
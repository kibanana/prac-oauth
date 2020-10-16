const { connect } = require('mongoose')

connect(process.env.DB_URL, { useNewUrlParser: true, autoReconnect: true, reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000 })
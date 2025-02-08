const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const authRoutes = require('./routes/auth')
const numberRoutes = require('./routes/numbers')

const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/numbers', numberRoutes)

const PORT = 7000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
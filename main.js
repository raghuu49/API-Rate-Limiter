import express from 'express'
import { rateLimiterMiddleware } from './middleware/ratelimiter.js'
import { config } from './config/config.js'

const app = express()
const PORT = 3000

app.use(express.json())

app.post('/limiter', rateLimiterMiddleware, (req, res) => {
    res.status(200).json({
        message: "API Call successful",
        algorithm: config.algorithm
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
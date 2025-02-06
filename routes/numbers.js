const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

// const dataPath = path.join(__dirname, '../../server/data/numbers.json')
const dataPath = "../data/numbers.json"

// Middleware برای احراز هویت
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    try {
        jwt.verify(token, 'your_jwt_secret')
        next()
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}

// ثبت شماره (بدون نیاز به احراز هویت)
router.post('/', (req, res) => {
    console.log(dataPath)
    try {
        const { phone } = req.body
        let numbers = []

        if (fs.existsSync(dataPath)) {
            numbers = JSON.parse(fs.readFileSync(dataPath))
        }

        if (numbers.includes(phone)) {
            return res.status(400).json({ message: 'شماره تکراری است' })
        }

        numbers.push(phone)
        fs.writeFileSync(dataPath, JSON.stringify(numbers))
        res.json({ message: 'Number saved successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})

// دریافت لیست شماره‌ها (نیاز به احراز هویت)
router.get('/', authenticate, (req, res) => {
    try {
        const numbers = fs.existsSync(dataPath)
            ? JSON.parse(fs.readFileSync(dataPath))
            : []
        res.json(numbers)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router
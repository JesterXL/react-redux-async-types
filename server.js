const express = require('express')
const cors = require('cors')
const uuidv4 = require('uuid/v4')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
const port = 9000

const foods = [
    { name: 'Avacado', calories: 160, fat: 15, carbs: 9, protein: 2}
    , { name: 'Chicken', calories: 165, fat: 3.6, carbs: 0, protein: 31}
    , { name: 'Almonds', calories: 576, fat: 49, carbs: 22, protein: 21}
    , { name: 'Apple', calories: 52, fat: 0.2, carbs: 14, protein: 0.3}
    , { name: 'Banana', calories: 89, fat: 0.3, carbs: 23, protein: 1.1}
]
.map(food => ({ ...food, id: uuidv4() }))

const validCookie = req => {
    if(req.cookies && req.cookies.sessionid === '1') {
        return true
    }
    return false
}

app.get('/food/list', (req, res) => {
    console.log("food list:", req.cookies)
    if(validCookie(req)) {
        setTimeout(() => {
            res.json(foods)
        }, 2000)
        return
    }
    return res.sendStatus(401)
})

const validUser = req => {
    if(req.body) {
        if(req.body.username === 'cow' && req.body.password === 'moo'){
            return true
        }
    }
    return false
}

const getSessionTimeout = () =>
    10 * 1000

app.post('/login', (req, res) => {
    if(validUser(req)) {
        setTimeout(() => {
            res.cookie('sessionid', '1', { httpOnly: true, expires: new Date(Date.now() + getSessionTimeout()) })
            res.json({result: 'login success'})
        }, 2000)
        return
    }
    setTimeout(() => {
        res.clearCookie('sessionid')
        res.sendStatus(401)
    }, 2000)
})

app.post('/logout', (req, res) => {
    res.clearCookie('sessionid', { httpOnly: true, expires: new Date(Date.now() + getSessionTimeout()) })
    res.json({result: 'logged out'})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
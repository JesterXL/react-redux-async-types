const express = require('express')
const cors = require('cors')
const uuidv4 = require('uuid/v4')

const app = express()
app.use(cors())
const port = 9000

const foods = [
    { name: 'Avacado', calories: 160, fat: 15, carbs: 9, protein: 2}
    , { name: 'Chicken', calories: 165, fat: 3.6, carbs: 0, protein: 31}
    , { name: 'Almonds', calories: 576, fat: 49, carbs: 22, protein: 21}
    , { name: 'Apple', calories: 52, fat: 0.2, carbs: 14, protein: 0.3}
    , { name: 'Banana', calories: 89, fat: 0.3, carbs: 23, protein: 1.1}
]
.map(food => ({ ...food, id: uuidv4() }))

app.get('/food/list', (req, res) =>
    setTimeout(() => {
        res.json(foods)
    }, 2000)
)

app.post('/food/login', (req, res) =>
    setTimeout(() => {
        res.json({result: 'login success'})
    }, 2000)
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

//#region 
app.use (
    express.urlencoded({
        extended: true

    })
)

app.use(express.json({
    type: "*/*"
}))

app.use(cors());
//#endregion

app.get('/transactions', (req, res) =>{
    res.send('Porbando Get desde el front')
})
app.post('/transactions', (req, res) =>{
    res.send('Probando Post desde el front')
})
app.listen(port, () => {
    console.log(`Estoy ejecutandome en http://localhost${port}`)
})
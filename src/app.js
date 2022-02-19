const express = require('express')
const app = express();


const port = 8000;

app.get('/', (req, res, err) => {
    try {
        res.send('Hello World!')
    } catch {
        console.error(err)
    }
})

app.listen(port, () => {
    console.log('App Now Listening on Port ' + port)
})

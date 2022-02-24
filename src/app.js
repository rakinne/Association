const express = require('express')
const app = express();

const path = require('path');
const htmlViews = path.join(__dirname, 'html')

const port = 8000;

app.use(express.static('public'))


app.listen(port, () => {
    console.log('App Now Listening on Port ' + port)
})

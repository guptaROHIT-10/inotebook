const connectToMongo = require('./db');

const express = require('express')
connectToMongo();
const app = express()
const port = 3000;
var cors = require('cors')

app.use(cors());
app.use(express.json())

//Avilable Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`i-Notebook Backend listening on port http://localhost:${port}`)
})

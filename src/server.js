const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./app/Routes/router.js')

const port = 3333;
app.use(cors());
app.use(express.json());

app.use('/', routes);


app.listen(3333, () => console.log(`⚡🚪 Backend started at http://localhost:${port}`));

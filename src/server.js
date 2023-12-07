const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./app/Routes/router.js');

const port = 3333;
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/app/Public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/Public/Views');

app.use('/', routes);

app.listen(port, () => console.log(`⚡🚪 Backend started at http://localhost:${port}`));

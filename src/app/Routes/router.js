const express = require('express');
const routes = express.Router();
const controllerOBJ = require('../Controllers/controller.js');

routes.get("/", controllerOBJ.home);
routes.get("/params", controllerOBJ.params);

module.exports = routes;

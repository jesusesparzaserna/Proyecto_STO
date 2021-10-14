const express = require('express');//libreria del servidor 
const app = express();
app.use(require('./personal'));
app.use(require('./articulo'));
module.exports = app; //exportacion        
// 
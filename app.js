const http = require('http');
const express = require('express');
const app = express();
const adminroutes = require('./routes/admin');
const hbs  = require('express-handlebars');

app.use(adminroutes); 
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

const server = http.createServer(app);
server.listen(3000);




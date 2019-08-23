// const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
// const bodyParser     = require('body-parser');
// const app            = express();
// const port = 8000;
// app.use(bodyParser.urlencoded({ extended: true }));
// require('./app/routes')(app, {});
// app.listen(port, () => {
//   console.log('We are live on ' + port);
// });

const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const basicAuth 	 = require('express-basic-auth');
var mongoose 		 = require('mongoose');
const http = require('http');
const https = require('https');

var mongoDB 		 = require('./config').mongoDB;
mongoose.connect(mongoDB);
var db = mongoose.connection;

db.on('error', (err) => {
	console.log(err);
});
db.once('open', () => {
	console.log('Connected to DB');
});

// app.use(basicAuth({
//     users: { 'admin': 'TMSgKVEEiDAaMpS1rY1Ip81zh29WoUfw' }
// }));

// Starting both http & https servers
const httpServer = http.createServer(app);

httpServer.listen(8000, () => {
	console.log('HTTP Server running on port 8000');
});

httpServer.setTimeout(5000000)

const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app, {});
// app.listen(port, () => {
//   console.log('We are live on ' + port);
// });

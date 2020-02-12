const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
// Connect to Database
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }, () => { console.log("we are connected") }).catch(err => console.log(err));

// On Error
mongoose.connection.on('error', (err) => {
    console.log('database error  ' + err);
})

const app = express();

const port = process.env.PORT || 3000;

const users = require('./routes/user');
const customers = require('./routes/customer');
const products = require('./routes/product');

// Port Number

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Use Routers
app.use('/cutomers', customers);
app.use('/users', users);
app.use('/products', products);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
})
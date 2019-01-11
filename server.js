const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes and all requests
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware [from express]
// Use for POST requests and get data from body [req.body]
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config `Import mLab key for database`
const db = require('./config/keys').mongoURI;

// Connect to MongoDB [using db variable from above^]
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello!'));

// First parameter defines the url endpoint for each API
// Second parameter is the routes and logic for each route brought in from routes/api

// Handles registration and login
app.use('/api/users', users);
// 
app.use('/api/profile', profile);
// 
app.use('/api/posts', posts);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
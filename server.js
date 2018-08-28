const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const items = require('./routes/api/items');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// Db configuration
const db = require('./config/keys').mongoURI;

// Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(error => console.log(error));

// Routing
app.use('/api/items', items);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


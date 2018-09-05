const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
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

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

//Rutas
const standardQueriesRoute = require('./routes/standardQueriesRoute');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/standard-queries', standardQueriesRoute);

const SERVER_PORT = process.env.SERVER_PORT || 5000;
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
    console.log(`Test the database connection at http://localhost:${SERVER_PORT}/api/test-db`);
});
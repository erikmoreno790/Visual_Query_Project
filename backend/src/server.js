const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

// Sample route to test database connection
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({ success: true, time: result.rows[0].now });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ success: false, message: 'Database connection error' });
    }
});
const SERVER_PORT = process.env.SERVER_PORT || 5000;
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
    console.log(`Test the database connection at http://localhost:${SERVER_PORT}/api/test-db`);
});
const express = require('express');
const App = express();

const mongoose = require('mongoose');
const AuthRouter = require('./Authentication');
const CalendRouter = require('./Calendari');
const DispRouter = require('./Disposizioni');

App.use('/api/auth', AuthRouter);
App.use('/api/rifiuti/calendari', CalendRouter);

require('dotenv').config();

mongoose
.connect(process.env.DB_URI)
.then(() => { 
    console.log('Connected to Database'); 
    App.listen(3000, () => { 
        console.log('Server is running on port 3000'); 
    }); 
}) 
.catch(err => { console.error('Database connection error:', err); });
const express = require('express');
const App = express();
require('dotenv').config();
App.use(express.json());

const mongoose = require('mongoose');
const AuthRouter = require('./Authentication');
const CalendRouter = require('./Calendari');

App.use('/api/auth', AuthRouter);
App.use('/api/rifiuti/calendari', CalendRouter);


mongoose.connect(process.env.DB_URI)
.then(() => { console.log('Connected to Database'); }) 
.catch(err => { console.error('Database connection error:', err); });

App.listen(process.env.PORT, () => { console.log('Server is running on port ' + process.env.PORT); }); 
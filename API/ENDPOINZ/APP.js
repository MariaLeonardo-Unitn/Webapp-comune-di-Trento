const express = require('express');
const App = express();
require('dotenv').config();

const cors = require('cors');
App.use(cors());


App.use(express.json());

const mongoose = require('mongoose');
const { router: AuthRouter, authenticateToken }= require('./ROUTERZ/Authentication');
const CalendRouter = require('./ROUTERZ/Calendari');
const DispRouter = require('./ROUTERZ/Disposizioni');
App.use((req, res, next) => { console.log(`${req.method} ${req.url}`); next(); });
App.use('/api/auth', AuthRouter);
App.use('/api/rifiuti/calendari', authenticateToken);
App.use('/api/rifiuti/calendari', CalendRouter);
App.use('/api/rifiuti/disposizioni', DispRouter);


mongoose.connect(process.env.DB_URI)
.then(() => { console.log('Connected to Database'); }) 
.catch(err => { console.error('Database connection error:', err); });

App.listen(process.env.PORT, () => { console.log('Server is running on port ' + process.env.PORT); }); 
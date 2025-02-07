const express = require('express');
const App = express();
const cors = require('cors');
require('dotenv').config();
App.use(cors());
App.use(express.json());


const mongoose = require('mongoose');
const AuthRouter = require('./ROUTERZ/Authentication');
const CalendRouter = require('./ROUTERZ/Calendari');
const DispRouter = require('./ROUTERZ/Disposizioni');
const SegnRouter = require('./ROUTERZ/Segnalazioni');
const OpDolRouter = require('./ROUTERZ/OperatoreDolomiti');
const OpComRouter = require('./ROUTERZ/OperatoreComune');
App.use('/api/auth', AuthRouter);
App.use('/api/rifiuti/calendari', CalendRouter);
App.use('/api/rifiuti/disposizioni', DispRouter);
App.use('/api/segnalazioni', SegnRouter);
App.use('/api/operatore_dol', OpDolRouter);
App.use('/api/operatore_com', OpComRouter);


mongoose.connect(process.env.DB_URI)
.then(() => { console.log('Connected to Database'); }) 
.catch(err => { console.error('Database connection error:', err); });

App.listen(process.env.PORT, () => { console.log('Server is running on port ' + process.env.PORT); }); 
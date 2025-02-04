const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const App = express();
require('dotenv').config();





//setting dei router
const { router: AuthRouter, authenticateToken }= require('./ROUTERZ/Authentication');
const CalendRouter = require('./ROUTERZ/Calendari');
const DispRouter = require('./ROUTERZ/Disposizioni');

//per stampare a console le richieste che vengono fatte (così per il meme)
App.use((req, res, next) => { console.log(`${req.method} ${req.url}`); next(); });


App.use('/api/auth', AuthRouter);
App.use('/api/rifiuti/calendari', authenticateToken);
App.use('/api/rifiuti/calendari', CalendRouter);
App.use('/api/rifiuti/disposizioni', DispRouter);

App.use(cors());
App.use(express.json());

App.use(express.static(path.join(__dirname, '..', '..', 'FrontEnd', 'Login')));
App.get('/', (req, res) => { res.sendFile(path.join(__dirname, '..', '..', 'FrontEnd', 'Login', 'login.html')); });

App.get('/loadPage', (req, res) => {
    const page = req.query.page;
    const dir = req.query.Dir;
    res.sendFile(path.join(__dirname, '..', '..', 'FrontEnd', dir, page));
});


mongoose.connect(process.env.DB_URI)
.then(() => { console.log('Connected to Database'); }) 
.catch(err => { console.error('Database connection error:', err); });

App.listen(process.env.PORT, () => { console.log('Server is running on port ' + process.env.PORT); }); 
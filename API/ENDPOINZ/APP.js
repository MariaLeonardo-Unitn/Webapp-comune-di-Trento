const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const App = express();
require('dotenv').config();


//per stampare a console le richieste che vengono fatte 
App.use((req, res, next) => { console.log(`${req.method} ${req.url}`); next(); });
App.use(cors());
App.use(express.json());

//creazione dei router
const { router: AuthRouter, authenticateToken, authenticateDolRole, authenticateComRole } = require('./ROUTERZ/Authentication');
const CalendRouter = require('./ROUTERZ/Calendari');
const DispRouter = require('./ROUTERZ/Disposizioni');
const SegnRouter = require('./ROUTERZ/Segnalazioni');
const PrenoRouter = require('./ROUTERZ/Prenotazioni');
const DolSegnRouter = require('./ROUTERZ/Dolomiti');
const ComSegnRouter = require('./ROUTERZ/Comune');

//setting dei router

App.use('/api/auth', AuthRouter);

//l'autenticazione è specificata dentro al router perché alcuni endpoint sono per utenti loggati, altri per operatori
App.use('/api/rifiuti/calendari', CalendRouter);

//l'autenticazione è specificata dentro al router perché alcuni endpoint sono per utenti loggati, altri per operatori
App.use('/api/rifiuti/disposizioni', DispRouter);

App.use('/api/prenotazione', authenticateToken);
App.use('/api/prenotazione', PrenoRouter);

App.use('/api/segnalazioni', SegnRouter);

App.use('/api/operatore_dol/', authenticateDolRole);
App.use('/api/operatore_dol/', DolSegnRouter);

App.use('/api/operatore_com/', authenticateComRole);
App.use('/api/operatore_com/', ComSegnRouter);



//COMMENTARE QUI SOTTO PER I SUPERTEST SE NO NON VANNO :)

//
//
mongoose.connect(process.env.DB_URI)
.then(() => { console.log('Connected to Database'); }) 
.catch(err => { console.error('Database connection error:', err); });
App.listen(process.env.PORT, () => { console.log('Server is running on port ' + process.env.PORT); });
//
//


module.exports = App;
const request = require('supertest');
const app = require('../APP');
const mongoose = require('mongoose');

describe('test pren methods', () => {
    var fakePrenotazione = {
        tipoSacchetto: "sacchettoTipoB",
        quantita: 5,
        puntoRitiro: "1"
    };
    var utente = { email: "jonny@jonny.jonny", password: "jonny" };
    var token;

    beforeAll( async () => {
        jest.setTimeout(20000);
        app.locals.db = await mongoose.connect(process.env.TEST_DB_URI);         
    });
    afterAll( () => { mongoose.connection.close(true); });

    //login necessaria per utilizzare questi endpoint
    test('POST /login', () => {
        return request(app).post('/api/auth/login')
        .send({ email: utente.email, password: utente.password })
        .expect(200)
        .then((response) => { token = response.body.token; });
    });
    
    //TEST POST /prenotazione
    test('POST /api/prenotazione', () => {
        return request(app).post('/api/prenotazione')
        .set('access-token', token)
        .set('Accept', 'application/json')
        .send(fakePrenotazione)
        .expect(201);
    });
})
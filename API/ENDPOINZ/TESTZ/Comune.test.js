const request = require('supertest');
const app = require('../APP');
const mongoose = require('mongoose');

describe('Test Comune methods', () => {
    //questo utente possiede i requisiti per chiamare OGNI metodo
    var utente = { email: "mvb@milan.olandesi", password: "28", };
    var prenotazioneId;
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


    test('TEST GET /operatore_com/segnalazioni', () => {
        return request(app).get('/api/operatore_com/segnalazioni')
        .set('access-token', token)
        .set('Accept', 'application/json')
        .expect(200);
    });

    test('TEST GET /operatore_com/prenotazioni', () => {
        return request(app).get('/api/operatore_com/prenotazioni')
        .set('access-token', token)
        .set('Accept', 'application/json')
        .expect(200)
        .then((res) => { return res.body; })
        .then((data) => { prenotazioneId = data[0].prenotazioneId});
    });
    
    test('TEST DELETE /operatore_com/prenotazione/:prenotazioneId', () => {
        return request(app).delete('/api/operatore_com/prenotazione/' + prenotazioneId)
        .set('access-token', token)
        .set('Accept', 'application/json')
        .expect(204);
    });
});
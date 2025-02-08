const request = require('supertest');
const app = require('../APP');
const mongoose = require('mongoose');

describe('Test Dolomiti methods', () => {

    //questo utente possiede i requisiti per chiamare ogni metodo
    var utente = { email: "capo@gang.it", password: "clang", };
    var segnalazioneId;
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


    test('TEST GET /segnalazioni', () => {
        return request(app).get('/api/operatore_dol/segnalazioni')
        .set('access-token', token)
        .set('Accept', 'application/json')
        .expect(200)
        .then((res) => { return res.body})
        .then((data) => { segnalazioneId = data[0].segnalazioneId});
    });

    test('TEST PATCH /segnalazioni/:segnalazioneId', () => {
        return request(app).patch('/api/operatore_dol/segnalazioni/' + segnalazioneId )
        .set('access-token', token)
        .set('Accept', 'application/json')
        .send({stato: 'presa in carico'})
        .expect(200);
    });

    test('TEST DELETE /segnalazioni/:segnalazioneId', () => {
        return request(app).delete('/api/operatore_dol/segnalazioni/' + segnalazioneId)
        .set('access-token', token)
        .set('Accept', 'application/json')
        .expect(204);
    });
});
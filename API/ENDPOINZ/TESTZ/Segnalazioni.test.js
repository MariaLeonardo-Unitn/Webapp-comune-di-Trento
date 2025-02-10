const request = require('supertest');
const app = require('../APP');
const mongoose = require('mongoose');



describe('Test segn methods', () => {
    var fakeSegnalazione = {
        utente: "1",
        segnalazione: "uso abusivo",
        luogo: "casa mia",
        descrizione: "c'è un immondizia in più nel mio bidone",
        foto: "wetjwejiwerjwerijwn",
        posizione: {
            latitudine: 0,
            longitudine: 0
        }
    }
    var fakeSegnalazioneId;
    //questo utente possiede i requisiti per chiamare OGNI metodo
    var utente = { email: "mvb@milan.olandesi", password: "28", };
    var utenteId;
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
        .then((response) => { 
            token = response.body.token; 
            utenteId = response.body.utenteId
            segnalazioneId = response
        });
    });
    

    test('POST /segnalazioni', () => {
        return request(app).post('/api/segnalazioni')
        .set('access-token', token)
        .set('Accept', 'application/json')
        .send(fakeSegnalazione)
        .expect(201)
        .then((res) => { 
            fakeSegnalazioneId = res.body.segnalazioneId;
        });
    });

    test('GET /segnalazioni/utenteId', () => {
        return request(app).get('/api/segnalazioni/utenteId')
        .set('access-token', token)
        .set('Accept', 'application/json')
        .query({utenteId})
        .expect(200);
    });

    test('GET /segnalazioni/segnalazioneId', () => {
        return request(app).get('/api/segnalazioni/' + fakeSegnalazioneId)
        .set('access-token', token)
        .set('Accept', 'application/json')
        .expect(200);
    });
});
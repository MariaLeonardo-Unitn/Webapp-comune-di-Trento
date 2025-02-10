const request = require('supertest');
const app = require('../APP');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('test auth methods', () => {
    beforeAll( async () => {
        jest.setTimeout(20000);
        app.locals.db = await mongoose.connect(process.env.TEST_DB_URI); 
    });
    afterAll( () => { mongoose.connection.close(true); });


    var utente = { 
        nome: "jonny",
        cognome: "jonny",
        codiceFiscale: "jonny",
        email: "jonny@jonny.jonny", 
        password: "jonny",
        role: "cittadino"
    };

    //TEST /signup
    test('POST /signup', () => {
        return request(app).post('/api/auth/signup')
        .send(utente)
        .expect(201);
    });


    //TEST /login
    //token di un utente generato dalla signup sopra
    var token;
    test('POST /login', () => {
        return request(app).post('/api/auth/login')
        .send({ email: utente.email, password: utente.password })
        .expect(200)
        .then((response) => { token = response.body.token; });
    });
    
    
    //token generato da un utente inesistente
    /*var token = jwt.sign( 
        {
            email: 'LPellegrini7@asroma.it', 
            role: 'cittadino',
            permissions: ['visualizza_rifiuti'],
            issuedAt: Date.now()
            },
            process.env.SECRET_KEY,
            { expiresIn: '60m' }
        );*/
            
            
    //TEST /me
    test('GET /me', () => {
        return request(app).get('/api/auth/me')
        .set('access-token', token)
        .set('Accept', 'application/json')
        .expect(200);
    });

    
  
});
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


    //TEST /login
    test('POST /login', () => {
        return request(app).post('/api/auth/login')
        .send({ email: "jonny@jonny.jonny", password: "jonny" })
        .expect(200);
    });



    //TEST /me
    var token = jwt.sign( 
        {
            email: 'LPellegrini7@asroma.it', 
            role: 'cittadino',
            permissions: ['visualizza_rifiuti'],
            issuedAt: Date.now()
        },
        process.env.SECRET_KEY,
        { expiresIn: '60m' }
    );
    test('GET /me', () => {
        return request(app).get('/api/auth/me')
        .set('access-token', token)
        .set('Accept', 'application/json')
        .expect(200);
    });
});
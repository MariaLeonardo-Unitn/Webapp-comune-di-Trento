const request = require('supertest');
const app = require('../APP');
const mongoose = require('mongoose');


describe('test calend methods', () => {
    
    var fakePdf = Buffer.from('%PDF-1.4\n%Fake PDF file');
    var zona = "mantova";
    //questo utente possiede i requisiti per chiamare ogni metodo
    var utente = { email: "capo@gang.it", password: "clang", };
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




    //TEST POST /calendari/zona
    test('POST calendario', () => {
        return request(app).post('/api/rifiuti/calendari/' + zona)
        .set('access-token', token)
        .set('Accept', 'application/pdf')
        .attach('file', fakePdf, 'calendario.pdf')
        .expect(201)
    });

    //TEST GET /calendari/zona
    test('GET calendario', () => {
        return request(app).get('/api/rifiuti/calendari/' + zona)
        .set('access-token', token)
        .set('Accept', 'application/pdf')
        .expect(200)
    });
    

    //TEST PATCH /calendari/zona
    test('PATCH calendario', () => {
        let newFakePdf = Buffer.from('%PDF-1.4\n% New fake PDF file');
        return request(app).patch('/api/rifiuti/calendari/' + zona)
        .set('access-token', token)
        .set('Accept', 'application/pdf')
        .attach('file', newFakePdf, 'calendario.pdf')
        .expect(200);
    })

    //TEST DELETE /calendari/zona
    test('DELETE calendario', () => {
        return request(app).delete('/api/rifiuti/calendari/' + zona)
        .set('access-token', token)
        .expect(200);
    });
});
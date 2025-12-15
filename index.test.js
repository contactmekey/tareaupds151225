const request = require('supertest');
const app = require('./index');
const pool = require('./db');

describe('Endpoints API', () => {

    afterAll(async () => {
        await pool.end();
    });

    it('GET / debería devolver estado 200', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });

    it('POST /users debería crear un usuario', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'Test User', email: 'test@example.com' });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });
});
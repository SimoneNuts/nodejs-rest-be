const request = require('supertest');
const app = require('../src/app');

describe('Auth Routes', () => {
    describe('POST /api/v1/auth/login', () => {
        it('should return 200 and token on valid login', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should return 401 on invalid credentials', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                });

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('error');
        });
    });
});

const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/config/db');
const bcrypt = require('bcrypt');

beforeEach(() => {
    db.prepare('DELETE FROM users').run();
});

describe('Auth Integration', () => {
    const user = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'securepassword'
    };

    describe('POST /api/v1/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/v1/auth/register')
                .send(user);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('message', 'Registered user');
            expect(res.body).toHaveProperty('userId');
        });

        it('should not allow duplicate email', async () => {
            // Beginning to sign up
            await request(app).post('/api/v1/auth/register').send(user);

            // Attempt with the same email
            const res = await request(app)
                .post('/api/v1/auth/register')
                .send(user);

            expect(res.status).toBe(409);
            expect(res.body).toHaveProperty('error', 'Email already registered');
        });
    });

    describe('POST /api/v1/auth/login', () => {
        beforeEach(() => {
            // Prepara utente registrato manualmente
            const hashedPassword = bcrypt.hashSync(user.password, 10);
            db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)')
                .run(user.username, user.email, hashedPassword);
        });

        it('should login with valid credentials and return token', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({ email: user.email, password: user.password });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('user');
            expect(res.body.user).toMatchObject({
                email: user.email,
                username: user.username
            });
        });

        it('should reject invalid password', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({ email: user.email, password: 'wrongpassword' });

            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('error', 'Invalid email or password');
        });

        it('should reject unknown email', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({ email: 'notfound@example.com', password: user.password });

            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('error', 'Invalid email or password');
        });
    });
});

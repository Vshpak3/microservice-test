import request from 'supertest';
import { app } from '../src/index';
import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });

beforeAll(async () => {
    await redisClient.connect();
    await redisClient.set(
        'posts',
        JSON.stringify([{ id: 1, title: 'Test Post', content: 'This is a test post.' }])
    );
});

afterAll(async () => {
    await redisClient.del('posts');
    await redisClient.quit();
});

describe('Posts API', () => {
    it('should return 200 and posts if found', async () => {
        const response = await request(app).get('/api/posts');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return 404 if no posts are found', async () => {
        await redisClient.del('posts');
        const response = await request(app).get('/api/posts');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'No posts found' });
    });
});

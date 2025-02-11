import express, { Application, Request, Response } from 'express';
import { createClient } from 'redis';

const app: Application = express();
const port = 3000;

const url = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({ url });

redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.error('Redis error:', err));

(async () => {
    await redisClient.connect();
})();

app.get('/api/posts', async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await redisClient.get('posts');

        if (data && JSON.parse(data).length > 0) {
            res.status(200).json(JSON.parse(data));
        } else {
            res.status(404).json({ error: 'No posts found' });
        }
    } catch (error) {
        console.error('Redis fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

export { app };

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

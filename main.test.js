import request from 'supertest';
import express from 'express';
import { rateLimiterMiddleware } from './middleware/ratelimiter.js';
import { config } from './config/config.js';

// Create a test app
function createTestApp() {
  const app = express();
  app.use(express.json());
  app.post('/limiter', rateLimiterMiddleware, (req, res) => {
    res.status(200).json({
      message: "API Call successful",
      algorithm: config.algorithm
    });
  });
  return app;
}

describe('API Rate Limiter', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  describe('POST /limiter', () => {
    test('should return 400 if user_id is missing', async () => {
      const response = await request(app)
        .post('/limiter')
        .send({ timestamp: Date.now() / 1000 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('User Id is required');
    });

    test('should return 200 if valid request with user_id and timestamp', async () => {
      const response = await request(app)
        .post('/limiter')
        .send({
          user_id: 'user123',
          timestamp: Date.now() / 1000
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('API Call successful');
    });

    test('should use current timestamp if not provided', async () => {
      const response = await request(app)
        .post('/limiter')
        .send({ user_id: 'user123' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
    });

    test('should return rate limit error (429) when limit exceeded', async () => {
      const user_id = 'test-user-429';
      const requests = [];

      // Make requests to exceed the limit
      for (let i = 0; i < config[config.algorithm].capacity + 1; i++) {
        requests.push(
          request(app)
            .post('/limiter')
            .send({ user_id, timestamp: Date.now() / 1000 })
        );
      }

      const responses = await Promise.all(requests);
      const tooManyRequests = responses.filter(r => r.status === 429);

      expect(tooManyRequests.length).toBeGreaterThan(0);
      expect(tooManyRequests[0].body).toHaveProperty('error');
      expect(tooManyRequests[0].body.error).toBe('Too Many Requests');
    });

    test('should return correct algorithm in response', async () => {
      const response = await request(app)
        .post('/limiter')
        .send({ user_id: 'user123' });

      expect(response.body.algorithm).toBe(config.algorithm);
    });
  });

  describe('Error handling', () => {
    test('should handle invalid JSON gracefully', async () => {
      const response = await request(app)
        .post('/limiter')
        .set('Content-Type', 'application/json')
        .send('invalid json');

      expect(response.status).toBe(400);
    });
  });
});

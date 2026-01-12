import request from 'supertest';
import app from '@/app';

describe('Health Routes', () => {
  describe('GET /api/v1/health', () => {
    it('should return 200 and health status', async () => {
      const response = await request(app).get('/api/v1/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Server is healthy');
      expect(response.body.data).toHaveProperty('uptime');
      expect(response.body.data).toHaveProperty('timestamp');
      expect(response.body.data).toHaveProperty('environment');
      expect(response.body.data).toHaveProperty('status', 'operational');
    });
  });

  describe('GET /api/v1/health/db', () => {
    it('should return 200 and database health status', async () => {
      const response = await request(app).get('/api/v1/health/db');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Database is healthy');
      expect(response.body.data).toHaveProperty('status', 'connected');
      expect(response.body.data).toHaveProperty('timestamp');
    });
  });
});

describe('404 Handler', () => {
  it('should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/api/v1/non-existent-route');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Route not found');
  });
});

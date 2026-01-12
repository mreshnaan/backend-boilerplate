import { Router, Request, Response } from 'express';
import { SuccessHandler } from '@/utils';
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check endpoints
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 */
router.get('/', (_req: Request, res: Response) => {
  SuccessHandler.ok(res, 'Server is healthy', {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    status: 'operational',
  });
});

/**
 * @swagger
 * /health/db:
 *   get:
 *     summary: Database health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Database is healthy
 */
router.get('/db', async (_req: Request, res: Response) => {
  // You can add actual database ping here
  SuccessHandler.ok(res, 'Database is healthy', {
    status: 'connected',
    timestamp: new Date().toISOString(),
  });
});

export default router;

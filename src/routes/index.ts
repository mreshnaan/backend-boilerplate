import { Router } from 'express';
import userRoutes from '@/routes/user.routes';
import healthRoutes from '@/routes/health.routes';

const router = Router();

// Health check routes
router.use('/health', healthRoutes);

// API Routes
router.use('/users', userRoutes);

export default router;

import { Router } from 'express';
import * as dashboardController from './dashboard.controller';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.use(requireAuth);

router.get('/stats', dashboardController.getStatsHandler);
router.get('/performance', dashboardController.getPerformanceHandler);
router.get('/open-positions', dashboardController.getOpenPositionsHandler);
router.get('/recent-activity', dashboardController.getRecentActivityHandler);

export default router;

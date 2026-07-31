import { Router } from 'express';
import * as tradesController from './trades.controller';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.use(requireAuth);

router.get('/', tradesController.listTradesHandler);
router.post('/', tradesController.createTradeHandler);
router.post('/import-csv', tradesController.importCsvHandler);
router.get('/:id', tradesController.getTradeHandler);
router.put('/:id', tradesController.updateTradeHandler);
router.delete('/:id', tradesController.deleteTradeHandler);

export default router;

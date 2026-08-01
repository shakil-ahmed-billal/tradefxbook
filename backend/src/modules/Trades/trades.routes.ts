import { Router } from 'express';
import * as tradesController from './trades.controller';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

// Public Webhook for MT5 EA HTTPS POST Sync (Authenticated via apiKey / userId in payload or x-api-key header)
router.post('/mt5-sync', tradesController.syncMt5TradesHandler);

router.use(requireAuth);

router.post('/bulk-delete', tradesController.bulkDeleteTradesHandler);
router.delete('/', tradesController.clearAllTradesHandler);
router.get('/', tradesController.listTradesHandler);
router.post('/', tradesController.createTradeHandler);
router.post('/import-csv', tradesController.importCsvHandler);
router.get('/:id', tradesController.getTradeHandler);
router.put('/:id', tradesController.updateTradeHandler);
router.put('/:id/journal', tradesController.upsertJournalHandler);
router.delete('/:id', tradesController.deleteTradeHandler);

export default router;

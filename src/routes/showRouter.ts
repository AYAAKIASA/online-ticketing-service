import express from 'express';
import { saveShow, getShows, searchShows, getShowById } from '../controllers/showController';

const router = express.Router();

router.post('/', saveShow);
router.get('/', getShows);
router.get('/search', searchShows);
router.get('/:id', getShowById);

export default router;

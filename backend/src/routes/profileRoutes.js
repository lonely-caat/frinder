import express from 'express';
import ProfileController from '../controllers/profileController.js';

const router = express.Router();

router.get('/', ProfileController.getProfiles);
router.get('/:id', ProfileController.getProfile);
router.post('/', ProfileController.createProfile);

export default router;

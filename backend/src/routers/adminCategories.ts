import express from 'express';
import auth from '../middlewares/auth';
import * as categoryController from '../controller/category.controller';

const router = express.Router();
router.use(auth.ensureAdmin);

router.get('/', categoryController.getAll);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.remove);


router.get('/product/:productId', categoryController.getForProduct);
router.post('/product/:productId/assign', categoryController.assign);
router.post('/product/:productId/unassign', categoryController.unassign);
router.post('/product/:productId/set', categoryController.setForProduct);

export default router;

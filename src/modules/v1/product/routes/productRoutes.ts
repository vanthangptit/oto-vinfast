import express from 'express';
import { productController } from '../controllers/productController';

const productRouter = express.Router();

/**
 * @method GET::Home page
 */
productRouter.get(
  '/',
  productController
);

export default productRouter;

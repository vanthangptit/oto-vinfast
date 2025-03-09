import express from 'express';
import { productDetailController } from '../controllers/productDetailController';

const productDetailRouter = express.Router();

/**
 * @method GET::Home page
 */
productDetailRouter.get(
  '/',
  productDetailController
);

export default productDetailRouter;

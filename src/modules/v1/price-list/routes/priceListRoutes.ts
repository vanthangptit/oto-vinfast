import express from 'express';
import { priceListController } from '../controllers/priceListController';

const priceListRouter = express.Router();

/**
 * @method GET::Home page
 */
priceListRouter.get(
  '/',
  priceListController
);

export default priceListRouter;

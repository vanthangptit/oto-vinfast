import express from 'express';
import { homeController } from '../controllers/homeController';

const homeRouter = express.Router();

/**
 * @method GET::Home page
 */
homeRouter.get(
  '/',
  homeController
);

export default homeRouter;

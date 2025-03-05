import express from 'express';

import {
  isValidationResult,
  rateLimitMiddleware
} from '../../../../middlewares';

import {
  contactValidation
} from './validations/contactValidation';
import { contactCreateCtrl } from '../controllers/contactController';

const contactRouter = express.Router();

/**
 * @method POST::Create comment
 */
contactRouter.post(
  '/:id',
  contactValidation(),
  isValidationResult,
  rateLimitMiddleware,
  contactCreateCtrl
);

export default contactRouter;

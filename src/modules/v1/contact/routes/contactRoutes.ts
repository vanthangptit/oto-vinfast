import express from 'express';

import {
  isValidationResult,
  rateLimitMiddleware
} from '../../../../middlewares';

import {
  contactValidation
} from './validations/contactValidation';
import {
  contactCreateCtrl,
  contactGetCtrl
} from '../controllers/contactController';

const contactRouter = express.Router();

/**
 * @method GET::Get contact
 */
contactRouter.get('/', contactGetCtrl);

/**
 * @method POST::Create contact
 */
contactRouter.post(
  '/',
  contactValidation(),
  isValidationResult,
  rateLimitMiddleware,
  contactCreateCtrl
);

export default contactRouter;

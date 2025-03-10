import { Request, Response, NextFunction } from 'express';

import { appError, getEntity } from '../../../../utils';
import { Contact } from '../models/Contact';
import { startSession } from 'mongoose';

/**
 * Get data of comment page
 */
export const contactGetCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = getEntity('contact');
    const header = getEntity('header');
    const footer = getEntity('footer');

    return res.render('contact', { data: { ...data }, header, footer });
  } catch (e: any) {
    return next(appError(e.message));
  }
};

/**
 * Create comment
 */
export const contactCreateCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customer, phone, car_type } = req.body;
  // const session = await startSession();
  // session.startTransaction();

  try {
    // await session.commitTransaction();
    // await session.endSession();
    return res.json({
      statusCode: 200,
      message: 'Comment successfully',
      data: { customer, phone, car_type },
    });
  } catch (e: any) {
    // await session.abortTransaction();
    // await session.endSession();
    return next(appError(e.message));
  }
};

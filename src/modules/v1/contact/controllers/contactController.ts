import { Request, Response, NextFunction } from 'express';

import { appError } from '../../../../utils';
import { Contact } from '../models/Contact';
import { startSession } from 'mongoose';

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

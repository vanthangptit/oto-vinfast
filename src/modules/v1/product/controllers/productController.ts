import { Request, Response, NextFunction } from 'express';

import {appError, getEntity} from '../../../../utils';

/**
 * Create comment
 */
export const productController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = getEntity('production');
    const header = getEntity('header');
    const footer = getEntity('footer');
    const cities = getEntity('cities');

    return res.render('product', { data: { ...data, ...cities }, header, footer });
  } catch (e: any) {
    return next(appError(e.message));
  }
};

import { Request, Response, NextFunction } from 'express';

import {appError, getEntity} from '../../../../utils';

/**
 * Create comment
 */
export const productDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req)
    const data = getEntity('product-detail');
    const header = getEntity('header');
    const footer = getEntity('footer');
    const cities = getEntity('cities');

    return res.render('product-detail', { data: { ...data, ...cities }, header, footer });
  } catch (e: any) {
    return next(appError(e.message));
  }
};

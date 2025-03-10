import { Request, Response, NextFunction } from 'express';

import { appError, getEntity } from '../../../../utils';
import { IFCarDetail } from "../../../../domain/interfaces";

/**
 * Create comment
 */
export const productController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = getEntity('product');
    const header = getEntity('header');
    const footer = getEntity('footer');
    const carDetails: IFCarDetail[] = getEntity('car-detail');

    return res.render('product', {
      data: {
        ...data,
        products: carDetails
      },
      header,
      footer
    });
  } catch (e: any) {
    return next(appError(e.message));
  }
};

import { Request, Response, NextFunction } from 'express';

import {appError, getEntity} from '../../../../utils';

/**
 * Create comment
 */
export const homeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = getEntity('landing');
    const header = getEntity('header');
    const footer = getEntity('footer');
    const cities = getEntity('cities');

    return res.render('home', { data: { ...data, ...cities }, header, footer });
  } catch (e: any) {
    return next(appError(e.message));
  }
};
